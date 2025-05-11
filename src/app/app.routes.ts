import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pokemon/pages/pokemon-page/pokemon-page.component').then(m => m.PokemonPageComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/error/error.component').then(m => m.ErrorComponent)
  }
];
