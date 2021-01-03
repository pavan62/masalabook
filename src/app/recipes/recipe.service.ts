import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 private recipes: Recipe[] = [
    new Recipe( 'Mushroom Masala', 'Good and tasty, just awesome',
      'https://static.toiimg.com/photo/75534551.cms', [
        new Ingredient('Mushroom', 1),
        new Ingredient('masala', 2)

      ]),
    new Recipe( 'Punner Masala', 'Good and Tasty',
      'https://static.toiimg.com/thumb/53098531.cms?imgsize=246555&width=800&height=800', [
      new Ingredient('Punner', 1),
      
    ])
  ];

  //private recipes: Recipe[] = [] ;

  recipesChanged = new Subject< Recipe[] >();

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice() ;
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addListOfIngredients(ingredients);
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
   this.recipes[index] = newRecipe;
   this.recipesChanged.next(this.recipes.slice());
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipes(recipes: Recipe[] ) {
    this.recipes = recipes ;
    this.recipesChanged.next(this.recipes.slice()) ;
  }
}
