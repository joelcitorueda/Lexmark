import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegionComponent } from './pages/region/region.component';
import { ProvidersComponent } from './pages/providers/providers.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mantenimiento', component: MaintenanceComponent },
  { path: 'soluciones', redirectTo: 'mantenimiento' },
  { path: 'contacto', component: ContactComponent },
  { path: 'region', component: RegionComponent },
  { path: 'proveedores', component: ProvidersComponent },
  { path: '**', redirectTo: '' }
];
