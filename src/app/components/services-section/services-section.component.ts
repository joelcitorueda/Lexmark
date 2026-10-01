import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  services = [
    {
      iconName: 'printer',
      title: 'Venta de Equipos',
      description: 'Amplio catálogo de impresoras y multifuncionales Lexmark para todo tipo de empresa, con precios competitivos.',
      link: '/soluciones'
    },
    {
      iconName: 'refresh',
      title: 'Renta de Impresoras',
      description: 'Renta mensual de equipos sin inversión inicial. Incluye mantenimiento preventivo y soporte técnico.',
      link: '/contacto'
    },
    {
      iconName: 'gear',
      title: 'Impresión Gestionada',
      description: 'Optimiza costos con nuestro programa MPS: paga solo por página impresa con soporte y consumibles incluidos.',
      link: '/contacto'
    },
    {
      iconName: 'wrench',
      title: 'Soporte Técnico',
      description: 'Asistencia técnica certificada Lexmark con tiempos de respuesta garantizados para mantener la continuidad operativa.',
      link: '/contacto'
    },
    {
      iconName: 'box',
      title: 'Consumibles Originales',
      description: 'Toners, cartuchos y kits de mantenimiento originales Lexmark con garantía de calidad y compatibilidad total.',
      link: '/soluciones'
    },
    {
      iconName: 'globe',
      title: 'Distribución Miami-Latam',
      description: 'Entrega rápida en toda la Florida y distribución a Latinoamérica. Somos tu socio de impresión en la región.',
      link: '/contacto'
    },
    {
      iconName: 'badge',
      title: 'Proveedores Autorizados',
      description: 'Consulta la lista oficial de proveedores autorizados por país y descarga el PDF correspondiente.',
      link: '/proveedores'
    },
  ];
}
