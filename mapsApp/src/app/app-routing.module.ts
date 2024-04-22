import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule ),
  },
  /*
  * Lazy load de un StandAlone comoponent, el cuál no estÁ importado dentro de ningún módulo.
  * En lugar de loadChildren usamos loadComponent
  */
  {
    path: 'alone',
    loadComponent: () => import('./alone/pages/alone-page/alone-page.component').then(m => m.AlonePageComponent ),
  },
  { 
    path: '**',
    redirectTo: 'maps'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
