import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog';
import { FormsModule } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeDialogComponent, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  searchTerm$ = new BehaviorSubject<string>('');
  category$ = new BehaviorSubject<string>('Toate');

  categories = ['Toate', 'Paste', 'Salate', 'Desert', 'Mic Dejun'];
  selectedCategory = 'Toate';

  showDialog = false;
  selectedRecipe: Recipe | undefined;
  activeMenuId: string | null = null;

  isLoading = true;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private shoppingListService: ShoppingListService
  ) {
    this.recipes$ = combineLatest([
      this.recipeService.getRecipes(),
      this.searchTerm$,
      this.category$
    ]).pipe(
      map(([recipes, term, category]) => {
        this.isLoading = false;
        const lowerTerm = term.toLowerCase();
        return recipes.filter(recipe => {
          const matchesSearch = recipe.title.toLowerCase().includes(lowerTerm) ||
            recipe.description.toLowerCase().includes(lowerTerm);
          const matchesCategory = category === 'Toate' || recipe.category === category;
          return matchesSearch && matchesCategory;
        });
      })
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.category$.next(category);
  }

  ngOnInit(): void { }

  viewDetails(id: string): void {
    this.router.navigate(['/recipes', id]);
  }

  toggleMenu(event: Event, id: string): void {
    event.stopPropagation();
    if (this.activeMenuId === id) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = id;
    }
  }

  closeMenu(): void {
    this.activeMenuId = null;
  }

  addRecipe(): void {
    this.selectedRecipe = undefined;
    this.showDialog = true;
  }

  editRecipe(event: Event, recipe: Recipe): void {
    event.stopPropagation();
    this.selectedRecipe = recipe;
    this.showDialog = true;
    this.closeMenu();
  }

  deleteRecipe(event: Event, id: string): void {
    event.stopPropagation();
    if (confirm('Sigur doriți să ștergeți această rețetă?')) {
      this.recipeService.deleteRecipe(id);
    }
    this.closeMenu();
  }

  addToShoppingList(event: Event, recipe: Recipe): void {
    event.stopPropagation();
    // Redirect to React app with ingredients
    const ingredientsParam = encodeURIComponent(JSON.stringify(recipe.ingredients));
    window.location.href = `http://localhost:5173/shopping-list?addItems=${ingredientsParam}`;
    this.closeMenu();
  }

  onDialogClose(): void {
    this.showDialog = false;
    this.selectedRecipe = undefined;
  }

  // Close menu when clicking outside
  onDocumentClick(): void {
    this.closeMenu();
  }
}
