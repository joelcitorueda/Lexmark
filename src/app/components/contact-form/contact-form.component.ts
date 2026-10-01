import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  tipo: string;
  mensaje: string;
}

const FORM_ENDPOINT = '/api/contact';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  submitted = signal(false);
  isLoading = signal(false);
  submitError = signal('');

  tiposRequerimiento = [
    'Cotización de Equipos',
    'Cotización de Consumibles',
    'Soporte Técnico',
    'Contrato de Mantenimiento',
    'Impresión Gestionada (MPS)',
    'Renta de Equipos',
    'Programa de Partners',
    'Otro requerimiento',
  ];

  form: ContactForm = {
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tipo: '',
    mensaje: '',
  };

  getDestinationEmail(): string {
    return 'informacion@lexmark.miami';
  }

  async onSubmit() {
    if (!this.form.nombre || !this.form.email || !this.form.tipo) return;

    this.isLoading.set(true);
    this.submitError.set('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre: this.form.nombre,
          empresa: this.form.empresa,
          email: this.form.email,
          telefono: this.form.telefono,
          tipo: this.form.tipo,
          mensaje: this.form.mensaje
        })
      });

      const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          isLocal
            ? 'El servidor de correo no está conectado. Configura ZOHO_PASS en .env, ejecuta npm run api y reinicia npm start.'
            : 'El servicio de correo no está disponible. Inténtalo nuevamente más tarde.'
        );
      }

      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || result.success === false) {
        if (response.status === 503 && isLocal) {
          throw new Error('Falta configurar ZOHO_PASS en .env. Después reinicia npm run api.');
        }
        throw new Error(result.message || 'No se pudo enviar la solicitud');
      }

      this.submitted.set(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      this.submitError.set(
        message && message !== 'Failed to fetch'
          ? message
          : 'No pudimos enviar tu solicitud. Inténtalo nuevamente en unos momentos.'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  resetForm() {
    this.submitted.set(false);
    this.submitError.set('');
    this.form = { nombre: '', empresa: '', email: '', telefono: '', tipo: '', mensaje: '' };
  }
}
