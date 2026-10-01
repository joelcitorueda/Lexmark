import { Component } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, RouterLink],
  template: `
    <section class="contact-page section-padding">
      <div class="container">
        <div class="section-header">
          <span class="badge">Contáctanos</span>
          <h1 class="section-title">Estamos aquí para <span>ayudarte</span></h1>
          <p class="section-subtitle">
            Envíanos tu requerimiento y nuestro equipo te responderá en menos de 24 horas.
          </p>
          <div class="section-divider"></div>
        </div>

        <div class="contact-page__grid">
          <div class="contact-page__cards">
            <div class="contact-page__card">
              <div class="contact-page__card-icon">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                 <rect x="3" y="5" width="18" height="14" rx="2" />
                 <path d="m3 7 9 6 9-6" />
               </svg>
             </div>
              <h3>Información General</h3>
              <a href="mailto:informacion@lexmark.miami">informacion&#64;lexmark.miami</a>
              <p>Cotizaciones, catálogo de productos y consultas generales.</p>
            </div>
            <div class="contact-page__card">
              <div class="contact-page__card-icon">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                 <circle cx="9" cy="8" r="3" />
                 <circle cx="17" cy="9" r="2.5" />
                 <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M14 15c3.9 0 7 1.4 7 5" />
               </svg>
             </div>
              <h3>Ventas y Partners</h3>
              <a href="mailto:ventaspartner@lexmark.miami">ventaspartner&#64;lexmark.miami</a>
              <p>Programa de partners, MPS, contratos y distribución.</p>
            </div>
            <div class="contact-page__card">
              <div class="contact-page__card-icon">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                 <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                 <circle cx="12" cy="10" r="2.5" />
               </svg>
             </div>
              <h3>Ubicación</h3>
              <span>Miami, Florida, USA</span>
              <p>Atendemos clientes en toda Florida y Latinoamérica.</p>
            </div>
            <div class="contact-page__card">
              <div class="contact-page__card-icon">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                 <circle cx="12" cy="12" r="9" />
                 <path d="M12 7v5l3 2" />
               </svg>
             </div>
              <h3>Horario</h3>
              <span>Lunes – Viernes</span>
              <p>9:00 AM – 6:00 PM EST. Soporte técnico disponible 24/7.</p>
            </div>
          </div>
          <div class="contact-page__form">
            <app-contact-form></app-contact-form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-page { background: var(--color-gray-100); }
    .contact-page__grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 48px;
      align-items: start;
    }
    .contact-page__cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .contact-page__card {
      background: white;
      border-radius: var(--radius-md);
      padding: 24px;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-gray-200);
      display: flex;
      flex-direction: column;
      gap: 6px;
      transition: var(--transition);
      &:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
    }
    .contact-page__card-icon {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      margin-bottom: 6px;
      color: var(--color-primary);
      background: rgba(204,0,0,0.07);
      border-radius: 50%;
    }
    .contact-page__card-icon svg { width: 21px; height: 21px; }
    .contact-page__card h3 { font-size: 0.95rem; color: var(--color-dark); }
    .contact-page__card a, .contact-page__card span {
      font-size: 0.82rem;
      color: var(--color-primary);
      font-weight: 600;
      word-break: break-all;
    }
    .contact-page__card p { font-size: 0.8rem; color: var(--color-gray-700); }
    .contact-page__form {
      background: white;
      border-radius: var(--radius-lg);
      padding: 40px;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--color-gray-200);
    }
    @media (max-width: 900px) {
      .contact-page__grid { grid-template-columns: 1fr; }
      .contact-page__form { padding: 24px; }
    }
    @media (max-width: 500px) {
      .contact-page__cards { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {}
