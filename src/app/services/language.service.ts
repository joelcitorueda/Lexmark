import { Injectable, computed, signal } from '@angular/core';
import { TRANSLATIONS } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  // Default language is always English (and the US flag) on every page load.
  currentLang = signal<string>('en');

  // Currently selected country code (ISO 3166-1 alpha-2, lowercase).
  currentCountry = signal<string>('us');

  // Small flag image for the selected country.
  flagUrl = computed(() => `https://flagcdn.com/w40/${this.currentCountry()}.png`);

  setLang(lang: string) {
    this.currentLang.set(lang);
  }

  // Applies both the site language and the country flag.
  setRegion(lang: string, country: string) {
    this.setLang(lang);
    this.currentCountry.set(country);
  }

  t(key: string): string {
    const lang = this.currentLang();
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['en']?.[key] ?? key;
  }
}
