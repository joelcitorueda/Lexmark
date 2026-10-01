import http from 'node:http';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const port = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.ALLOWED_ORIGIN || 'http://localhost:4200')
  .split(',')
  .map((origin) => origin.trim());
const destination = process.env.CONTACT_TO || 'ventaspartner@lexmark.miami';
const smtpUser = process.env.ZOHO_USER || '';
const smtpPass = process.env.ZOHO_PASS || '';
const smtpConfigured = Boolean(smtpUser && smtpPass);

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
  port: Number(process.env.ZOHO_SMTP_PORT || 465),
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

const attempts = new Map();
const windowMs = 10 * 60 * 1000;
const maxAttempts = 5;

function setCors(response, origin) {
  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(response, status, payload, origin) {
  setCors(response, origin);
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function clean(value, maxLength) {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  })[character]);
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > maxAttempts;
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 50000) {
        reject(new Error('Payload too large'));
        request.destroy();
      }
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    request.on('error', reject);
  });
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin || '';

  if (origin && !allowedOrigins.includes(origin)) {
    sendJson(response, 403, { message: 'Origen no permitido' }, '');
    return;
  }

  if (request.method === 'OPTIONS') {
    setCors(response, origin);
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'GET' && request.url === '/api/health') {
    sendJson(response, 200, { ok: true, smtpConfigured }, origin);
    return;
  }

  if (request.method !== 'POST' || request.url !== '/api/contact') {
    sendJson(response, 404, { message: 'Ruta no encontrada' }, origin);
    return;
  }

  if (!smtpConfigured) {
    sendJson(response, 503, { message: 'Servidor de correo no configurado' }, origin);
    return;
  }

  const ip = request.headers['x-forwarded-for']?.toString().split(',')[0].trim()
    || request.socket.remoteAddress
    || 'unknown';

  if (isRateLimited(ip)) {
    sendJson(response, 429, { message: 'Demasiados envíos. Inténtalo más tarde.' }, origin);
    return;
  }

  try {
    const payload = await readBody(request);
    const nombre = clean(payload.nombre, 120);
    const empresa = clean(payload.empresa, 120);
    const email = clean(payload.email, 180).toLowerCase();
    const telefono = clean(payload.telefono, 40);
    const tipo = clean(payload.tipo, 120);
    const mensaje = clean(payload.mensaje, 4000);

    if (!nombre || !tipo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(response, 400, { message: 'Datos de contacto incompletos o inválidos' }, origin);
      return;
    }

    const subject = `Nuevo requerimiento: ${tipo}${empresa ? ` - ${empresa}` : ''}`;
    const text = [
      `Nombre: ${nombre}`,
      `Empresa: ${empresa || 'No indicada'}`,
      `Correo: ${email}`,
      `Teléfono: ${telefono || 'No indicado'}`,
      `Tipo: ${tipo}`,
      '',
      mensaje || 'Sin mensaje adicional'
    ].join('\n');

    const html = `
      <h2>Nuevo requerimiento</h2>
      <table cellpadding="6" cellspacing="0" border="0">
        <tr><td><strong>Nombre</strong></td><td>${escapeHtml(nombre)}</td></tr>
        <tr><td><strong>Empresa</strong></td><td>${escapeHtml(empresa || 'No indicada')}</td></tr>
        <tr><td><strong>Correo</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Teléfono</strong></td><td>${escapeHtml(telefono || 'No indicado')}</td></tr>
        <tr><td><strong>Tipo</strong></td><td>${escapeHtml(tipo)}</td></tr>
      </table>
      <h3>Mensaje</h3>
      <p>${escapeHtml(mensaje || 'Sin mensaje adicional').replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: `Lexmark Miami <${smtpUser}>`,
      to: destination,
      replyTo: email,
      subject,
      text,
      html
    });

    sendJson(response, 200, { success: true, message: 'Mensaje enviado' }, origin);
  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : error);
    sendJson(response, 500, { message: 'No se pudo enviar el mensaje' }, origin);
  }
});

server.listen(port, () => {
  console.log(`Mail API listening on http://localhost:${port}`);
  if (!smtpConfigured) {
    console.warn('Zoho SMTP is not configured. Copy .env.example to .env and set ZOHO_PASS.');
  }
});
