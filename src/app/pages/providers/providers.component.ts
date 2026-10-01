import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LATAM_COUNTRIES, PROVIDER_PDFS } from '../../data/countries';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './providers.component.html',
  styleUrl: './providers.component.scss'
})
export class ProvidersComponent {
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  countries = LATAM_COUNTRIES;
  pdfs = PROVIDER_PDFS;

  // null = list view | string = raw PDF path
  private _activePdfUrl = signal<string | null>(null);
  activeCountry = signal<string>('');

  // Sanitized URL safe for iframe
  activePdf = computed<SafeResourceUrl | null>(() => {
    const url = this._activePdfUrl();
    return url
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`)
      : null;
  });

  activePdfRaw = computed(() => this._activePdfUrl());

  hasPdf(code: string): boolean {
    return !!this.pdfs[code];
  }

  selectCountry(code: string, name: string) {
    if (this.hasPdf(code)) {
      this._activePdfUrl.set(`/pdfs-prov/${this.pdfs[code]}`);
      this.activeCountry.set(name);
    }
  }

  closePdf() {
    this._activePdfUrl.set(null);
    this.activeCountry.set('');
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
