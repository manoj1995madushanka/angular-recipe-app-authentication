import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take, tap} from 'rxjs/operators';

import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-app-45088-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {

    // this pipe take function will do specified amount
    // of subscribes and take that subscription value and automatically unsubscribe that
    // take tells get only mentioned number of values from observable
    return this.authService.user.pipe(take(1), exhaustMap(user => {
        return this.http
          .get<Recipe[]>(
            'https://recipe-app-45088-default-rtdb.firebaseio.com/recipes.json',
            {
              params: new HttpParams().set('auth',user.token)
            }
          )
      }), map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }))

    /*return this.http
      .get<Recipe[]>(
        'https://recipe-app-45088-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )*/
  }
}
