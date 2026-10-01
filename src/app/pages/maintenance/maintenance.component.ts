import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent {
  private langService = inject(LanguageService);

  copy = computed(() => this.langService.currentLang() === 'es'
    ? {
        eyebrow: 'PRÓXIMAMENTE',
        title: 'Esta sección está en mantenimiento',
        body: 'Estamos preparando este contenido. Vuelve pronto para conocer todas las soluciones de Lexmark.',
        back: 'Volver al inicio'
      }
    : {
        eyebrow: 'COMING SOON',
        title: 'This section is under maintenance',
        body: 'We are preparing this content. Check back soon to explore our Lexmark solutions.',
        back: 'Back to home'
      });
}
