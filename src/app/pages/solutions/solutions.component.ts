import { Component } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <section class="solutions-hero">
      <div class="container">
        <span class="badge">Catálogo Completo</span>
        <h1>Nuestras <span class="text-primary">Soluciones</span></h1>
        <p>Encuentra la solución de impresión perfecta para las necesidades de tu empresa.</p>
      </div>
    </section>
    <app-products></app-products>
  `,
  styles: [`
    .solutions-hero {
      background: linear-gradient(135deg, var(--color-dark) 0%, #2d0000 100%);
      padding: 60px 0;
      text-align: center;
      h1 { color: white; margin: 12px 0 16px; }
      p  { color: rgba(255,255,255,0.75); font-size: 1.05rem; }
    }
  `]
})
export class SolutionsComponent {}
