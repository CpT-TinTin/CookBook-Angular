import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  showMenu = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipe = this.recipeService.getRecipe(id);
      if (!this.recipe) {
        this.router.navigate(['/recipes']);
      }
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleFavorite(): void {
    if (this.recipe) {
      this.recipeService.toggleFavorite(this.recipe.id);
      this.recipe = this.recipeService.getRecipe(this.recipe.id); // Refresh local state
      this.showMenu = false;
    }
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.shoppingListService.addItems(this.recipe.ingredients);
      alert('Ingrediente adăugate în lista de cumpărături!');
      this.showMenu = false;
    }
  }

  printRecipe(): void {
    alert('Se pregătește imprimarea pentru: ' + this.recipe?.title);
    this.showMenu = false;
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }
}
