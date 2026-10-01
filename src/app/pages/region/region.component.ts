import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Country {
  label: string;
  lang: string;
  code: string;
}

interface Region {
  name: string;
  countries: Country[];
}

@Component({
  selector: 'app-region',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './region.component.html',
  styleUrl: './region.component.scss'
})
export class RegionComponent {
  private router = inject(Router);
  langService = inject(LanguageService);

  regions: Region[] = [
    {
      name: 'Asia Pacific',
      countries: [
        { label: 'Bangladesh', lang: 'en', code: 'bd' },
        { label: 'Brunei', lang: 'en', code: 'bn' },
        { label: '香港', lang: 'en', code: 'hk' },
        { label: 'India', lang: 'en', code: 'in' },
        { label: 'Indonesia', lang: 'en', code: 'id' },
        { label: '日本', lang: 'en', code: 'jp' },
        { label: '대한민국', lang: 'en', code: 'kr' },
        { label: 'Malaysia', lang: 'en', code: 'my' },
        { label: 'Myanmar', lang: 'en', code: 'mm' },
        { label: 'Philippines', lang: 'en', code: 'ph' },
        { label: 'Polynésie française', lang: 'fr', code: 'pf' },
        { label: 'Singapore', lang: 'en', code: 'sg' },
        { label: 'Thailand', lang: 'en', code: 'th' },
        { label: 'Vietnam', lang: 'en', code: 'vn' },
        { label: '台灣', lang: 'en', code: 'tw' },
        { label: '中国', lang: 'en', code: 'cn' }
      ]
    },
    {
      name: 'Australia/New Zealand',
      countries: [
        { label: 'Australia', lang: 'en', code: 'au' },
        { label: 'New Zealand', lang: 'en', code: 'nz' }
      ]
    },
    {
      name: 'Europe/Middle East/Africa',
      countries: [
        { label: 'Afrique', lang: 'fr', code: 'un' },
        { label: 'Belgique', lang: 'fr', code: 'be' },
        { label: 'Belgium', lang: 'en', code: 'be' },
        { label: 'België', lang: 'en', code: 'be' },
        { label: 'Bulgaria', lang: 'en', code: 'bg' },
        { label: 'Danmark', lang: 'en', code: 'dk' },
        { label: 'Deutschland', lang: 'de', code: 'de' },
        { label: 'España', lang: 'es', code: 'es' },
        { label: 'Estonia', lang: 'en', code: 'ee' },
        { label: 'Finland', lang: 'en', code: 'fi' },
        { label: 'France', lang: 'fr', code: 'fr' },
        { label: 'Georgia', lang: 'en', code: 'ge' },
        { label: 'Hrvatska', lang: 'en', code: 'hr' },
        { label: 'Ireland', lang: 'en', code: 'ie' },
        { label: 'Italia', lang: 'it', code: 'it' },
        { label: 'Latvia', lang: 'en', code: 'lv' },
        { label: 'Lithuania', lang: 'en', code: 'lt' },
        { label: 'Magyarország', lang: 'en', code: 'hu' },
        { label: 'Middle East', lang: 'en', code: 'un' },
        { label: 'Nederland', lang: 'en', code: 'nl' },
        { label: 'Norge', lang: 'en', code: 'no' },
        { label: 'Österreich', lang: 'de', code: 'at' },
        { label: 'Polska', lang: 'en', code: 'pl' },
        { label: 'Portugal', lang: 'pt', code: 'pt' },
        { label: 'România', lang: 'en', code: 'ro' },
        { label: 'Schweiz', lang: 'de', code: 'ch' },
        { label: 'Serbia', lang: 'en', code: 'rs' },
        { label: 'Slovenia', lang: 'en', code: 'si' },
        { label: 'Slovensko', lang: 'en', code: 'sk' },
        { label: 'South Africa', lang: 'en', code: 'za' },
        { label: 'Suisse', lang: 'fr', code: 'ch' },
        { label: 'Ukraine', lang: 'en', code: 'ua' },
        { label: 'Sverige', lang: 'en', code: 'se' },
        { label: 'Türkiye', lang: 'en', code: 'tr' },
        { label: 'United Kingdom', lang: 'en', code: 'gb' },
        { label: 'Česko', lang: 'en', code: 'cz' },
        { label: 'Ελλάδα', lang: 'en', code: 'gr' },
        { label: 'ישׂראל', lang: 'en', code: 'il' }
      ]
    },
    {
      name: 'Latin America',
      countries: [
        { label: 'América Latina', lang: 'es', code: 'un' },
        { label: 'Argentina', lang: 'es', code: 'ar' },
        { label: 'Belize', lang: 'es', code: 'bz' },
        { label: 'Brasil', lang: 'pt', code: 'br' },
        { label: 'Bolivia', lang: 'es', code: 'bo' },
        { label: 'Caribbean (EN)', lang: 'en', code: 'ag' },
        { label: 'Caribbean (FR)', lang: 'fr', code: 'gp' },
        { label: 'Chile', lang: 'es', code: 'cl' },
        { label: 'Colombia', lang: 'es', code: 'co' },
        { label: 'Costa Rica', lang: 'es', code: 'cr' },
        { label: 'Ecuador', lang: 'es', code: 'ec' },
        { label: 'El Salvador', lang: 'es', code: 'sv' },
        { label: 'Guatemala', lang: 'es', code: 'gt' },
        { label: 'Honduras', lang: 'es', code: 'hn' },
        { label: 'México', lang: 'es', code: 'mx' },
        { label: 'Nicaragua', lang: 'es', code: 'ni' },
        { label: 'Panamá', lang: 'es', code: 'pa' },
        { label: 'Paraguay', lang: 'es', code: 'py' },
        { label: 'Perú', lang: 'es', code: 'pe' },
        { label: 'Puerto Rico (EN)', lang: 'en', code: 'pr' },
        { label: 'Puerto Rico (ES)', lang: 'es', code: 'pr' },
        { label: 'Uruguay', lang: 'es', code: 'uy' },
        { label: 'Venezuela', lang: 'es', code: 've' }
      ]
    },
    {
      name: 'United States / Canada',
      countries: [
        { label: 'Canada (EN)', lang: 'en', code: 'ca' },
        { label: 'Canada (FR)', lang: 'fr', code: 'ca' },
        { label: 'United States', lang: 'en', code: 'us' }
      ]
    }
  ];

  selectCountry(lang: string, code: string) {
    this.langService.setRegion(lang, code);
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
