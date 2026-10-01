import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface NavItem {
  label: string;
  link?: string;
  children?: { label: string; link: string }[];
}

const child = (label: string, link: string) => ({ label, link });

const NAV_ITEMS: Record<string, NavItem[]> = {
  en: [
    {
      label: 'Printers',
      children: [
        child('Lexmark printer finder', '/mantenimiento'),
        child('Enterprise and large business overview', '/mantenimiento'),
        child('Small and medium business overview', '/mantenimiento')
      ]
    },
    {
      label: 'Supplies & Parts',
      children: [
        child('Genuine supplies', '/mantenimiento'),
        child('Printer supplies finder', '/mantenimiento'),
        child('Parts and supplies', '/mantenimiento')
      ]
    },
    {
      label: 'Industries',
      children: [
        child('Healthcare', '/mantenimiento'),
        child('Education', '/mantenimiento'),
        child('Government', '/mantenimiento'),
        child('Manufacturing', '/mantenimiento'),
        child('Financial services', '/mantenimiento')
      ]
    },
    {
      label: 'Solutions',
      children: [
        child('Managed Print Services', '/mantenimiento'),
        child('Document security', '/mantenimiento'),
        child('Cloud and mobile printing', '/mantenimiento'),
        child('Workflow automation', '/mantenimiento')
      ]
    },
    {
      label: 'Services',
      children: [
        child('Technical support', '/contacto'),
        child('Maintenance contracts', '/contacto'),
        child('Printer leasing', '/contacto'),
        child('Training', '/contacto'),
        child('Authorized Providers', '/proveedores')
      ]
    },
    { label: 'Technical Support', link: '/contacto' }
  ],
  es: [
    {
      label: 'Impresoras',
      children: [
        child('Buscador de impresoras Lexmark', '/mantenimiento'),
        child('Resumen para empresas grandes', '/mantenimiento'),
        child('Resumen para pequeñas y medianas empresas', '/mantenimiento')
      ]
    },
    {
      label: 'Suministros y piezas',
      children: [
        child('Suministros originales', '/mantenimiento'),
        child('Buscador de suministros', '/mantenimiento'),
        child('Piezas y suministros', '/mantenimiento')
      ]
    },
    {
      label: 'Industrias',
      children: [
        child('Salud', '/mantenimiento'),
        child('Educación', '/mantenimiento'),
        child('Gobierno', '/mantenimiento'),
        child('Manufactura', '/mantenimiento'),
        child('Servicios financieros', '/mantenimiento')
      ]
    },
    {
      label: 'Soluciones',
      children: [
        child('Impresión gestionada', '/mantenimiento'),
        child('Seguridad de documentos', '/mantenimiento'),
        child('Impresión en la nube y móvil', '/mantenimiento'),
        child('Automatización de flujos de trabajo', '/mantenimiento')
      ]
    },
    {
      label: 'Servicios',
      children: [
        child('Soporte técnico', '/contacto'),
        child('Contratos de mantenimiento', '/contacto'),
        child('Renta de impresoras', '/contacto'),
        child('Capacitación', '/contacto'),
        child('Proveedores autorizados', '/proveedores')
      ]
    },
    { label: 'Soporte técnico', link: '/contacto' }
  ],
  pt: [
    {
      label: 'Impressoras',
      children: [
        child('Localizador de impressoras Lexmark', '/mantenimiento'),
        child('Visão geral para grandes empresas', '/mantenimiento'),
        child('Visão geral para pequenas e médias empresas', '/mantenimiento')
      ]
    },
    {
      label: 'Suprimentos e peças',
      children: [
        child('Suprimentos originais', '/mantenimiento'),
        child('Localizador de suprimentos', '/mantenimiento'),
        child('Peças e suprimentos', '/mantenimiento')
      ]
    },
    {
      label: 'Setores',
      children: [
        child('Saúde', '/mantenimiento'),
        child('Educação', '/mantenimiento'),
        child('Governo', '/mantenimiento'),
        child('Manufatura', '/mantenimiento'),
        child('Serviços financeiros', '/mantenimiento')
      ]
    },
    {
      label: 'Soluções',
      children: [
        child('Serviços de impressão gerenciada', '/mantenimiento'),
        child('Segurança de documentos', '/mantenimiento'),
        child('Impressão em nuvem e móvel', '/mantenimiento'),
        child('Automação de fluxos de trabalho', '/mantenimiento')
      ]
    },
    {
      label: 'Serviços',
      children: [
        child('Suporte técnico', '/contacto'),
        child('Contratos de manutenção', '/contacto'),
        child('Aluguel de impressoras', '/contacto'),
        child('Treinamento', '/contacto'),
        child('Provedores autorizados', '/proveedores')
      ]
    },
    { label: 'Suporte técnico', link: '/contacto' }
  ],
  fr: [
    {
      label: 'Imprimantes',
      children: [
        child("Recherche d'imprimantes Lexmark", '/mantenimiento'),
        child('Aperçu des grandes entreprises', '/mantenimiento'),
        child('Aperçu des petites et moyennes entreprises', '/mantenimiento')
      ]
    },
    {
      label: 'Fournitures et pièces',
      children: [
        child('Fournitures authentiques', '/mantenimiento'),
        child('Recherche de fournitures', '/mantenimiento'),
        child('Pièces et fournitures', '/mantenimiento')
      ]
    },
    {
      label: 'Secteurs',
      children: [
        child('Santé', '/mantenimiento'),
        child('Éducation', '/mantenimiento'),
        child('Administration', '/mantenimiento'),
        child('Fabrication', '/mantenimiento'),
        child('Services financiers', '/mantenimiento')
      ]
    },
    {
      label: 'Solutions',
      children: [
        child("Services de gestion de l'impression", '/mantenimiento'),
        child('Sécurité des documents', '/mantenimiento'),
        child('Impression cloud et mobile', '/mantenimiento'),
        child('Automatisation des flux de travail', '/mantenimiento')
      ]
    },
    {
      label: 'Services',
      children: [
        child('Support technique', '/contacto'),
        child('Contrats de maintenance', '/contacto'),
        child("Location d'imprimantes", '/contacto'),
        child('Formation', '/contacto'),
        child('Fournisseurs autorisés', '/proveedores')
      ]
    },
    { label: 'Support technique', link: '/contacto' }
  ],
  de: [
    {
      label: 'Drucker',
      children: [
        child('Lexmark-Druckerfinder', '/mantenimiento'),
        child('Überblick für große Unternehmen', '/mantenimiento'),
        child('Überblick für kleine und mittlere Unternehmen', '/mantenimiento')
      ]
    },
    {
      label: 'Verbrauchsmaterialien und Teile',
      children: [
        child('Originalverbrauchsmaterialien', '/mantenimiento'),
        child('Verbrauchsmaterialien finden', '/mantenimiento'),
        child('Teile und Verbrauchsmaterialien', '/mantenimiento')
      ]
    },
    {
      label: 'Branchen',
      children: [
        child('Gesundheitswesen', '/mantenimiento'),
        child('Bildung', '/mantenimiento'),
        child('Öffentliche Hand', '/mantenimiento'),
        child('Fertigung', '/mantenimiento'),
        child('Finanzdienstleistungen', '/mantenimiento')
      ]
    },
    {
      label: 'Lösungen',
      children: [
        child('Managed Print Services', '/mantenimiento'),
        child('Dokumentsicherheit', '/mantenimiento'),
        child('Cloud- und mobiles Drucken', '/mantenimiento'),
        child('Workflow-Automatisierung', '/mantenimiento')
      ]
    },
    {
      label: 'Dienstleistungen',
      children: [
        child('Technischer Support', '/contacto'),
        child('Wartungsverträge', '/contacto'),
        child('Druckergerätemiete', '/contacto'),
        child('Schulung', '/contacto'),
        child('Autorisierte Anbieter', '/proveedores')
      ]
    },
    { label: 'Technischer Support', link: '/contacto' }
  ],
  it: [
    {
      label: 'Stampanti',
      children: [
        child('Trova stampanti Lexmark', '/mantenimiento'),
        child("Panoramica aziende grandi", '/mantenimiento'),
        child('Panoramica piccole e medie imprese', '/mantenimiento')
      ]
    },
    {
      label: 'Forniture e ricambi',
      children: [
        child('Forniture originali', '/mantenimiento'),
        child('Trova forniture per stampanti', '/mantenimiento'),
        child('Parti e forniture', '/mantenimiento')
      ]
    },
    {
      label: 'Settori',
      children: [
        child('Sanità', '/mantenimiento'),
        child('Istruzione', '/mantenimiento'),
        child('Governo', '/mantenimiento'),
        child('Manifattura', '/mantenimiento'),
        child('Servizi finanziari', '/mantenimiento')
      ]
    },
    {
      label: 'Soluzioni',
      children: [
        child('Servizi di stampa gestita', '/mantenimiento'),
        child('Sicurezza dei documenti', '/mantenimiento'),
        child('Stampa cloud e mobile', '/mantenimiento'),
        child('Automazione dei flussi di lavoro', '/mantenimiento')
      ]
    },
    {
      label: 'Servizi',
      children: [
        child('Supporto tecnico', '/contacto'),
        child('Contratti di manutenzione', '/contacto'),
        child('Noleggio stampanti', '/contacto'),
        child('Formazione', '/contacto'),
        child('Fornitori autorizzati', '/proveedores')
      ]
    },
    { label: 'Supporto tecnico', link: '/contacto' }
  ]
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  langService = inject(LanguageService);

  isScrolled = signal(false);
  isMobileOpen = signal(false);
  activeDropdown = signal<string | null>(null);
  searchQuery = signal('');
  showCommerce = computed(() => ['us', 'es', 'au'].includes(this.langService.currentCountry()));
  navItems = computed<NavItem[]>(() => NAV_ITEMS[this.langService.currentLang()] ?? NAV_ITEMS['en']);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 10);
  }

  goToRegion() {
    this.router.navigate(['/region']);
    this.closeAll();
  }

  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }

  openDropdown(label: string) {
    this.activeDropdown.set(label);
  }

  closeDropdown() {
    this.activeDropdown.set(null);
  }

  closeAll() {
    this.activeDropdown.set(null);
    this.isMobileOpen.set(false);
  }
}
