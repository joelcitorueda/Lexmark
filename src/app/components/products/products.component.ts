import { Component, inject, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslatePipe, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  lang = inject(LanguageService);

  categories = [
    {
      titleKey: 'cat1_title',
      descKey: 'cat1_desc',
      btnKey: 'cat1_btn',
      linkKey: 'cat1_link',
      image: '/img/Pequeña y mediana empresa.jpg',
      buttonLink: '/mantenimiento',
      footerLinkUrl: '/mantenimiento'
    },
    {
      titleKey: 'cat2_title',
      descKey: 'cat2_desc',
      btnKey: 'cat2_btn',
      linkKey: 'cat2_link',
      image: '/img/Empresas y grandes empresas.jpg',
      buttonLink: '/mantenimiento',
      footerLinkUrl: '/mantenimiento'
    },
    {
      titleKey: 'cat3_title',
      descKey: 'cat3_desc',
      btnKey: 'cat3_btn',
      linkKey: 'cat3_link',
      image: '/img/Suministros y piezas.jpg',
      buttonLink: '/mantenimiento',
      footerLinkUrl: '/mantenimiento'
    }
  ];
}
