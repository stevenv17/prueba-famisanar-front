import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'products',
        loadComponent: () => import('./features/product/product.component')
          .then(m => m.ProductComponent)
      },
    ],
  },
  { // redirección si no coincide con las rutas anteriores
    path: '**', 
    redirectTo: '' 
  },
];
