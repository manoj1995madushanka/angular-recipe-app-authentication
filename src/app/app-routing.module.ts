import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule'},
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'}

  // below one is new one for above line
  /*path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then(m => {
  m.RecipeModule*/
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
