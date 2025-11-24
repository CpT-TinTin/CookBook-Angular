import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models';
import { Observable } from 'rxjs';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeDialogComponent],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  showDialog = false;
  selectedRecipe: Recipe | undefined;
  activeMenuId: string | null = null;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipes$ = this.recipeService.getRecipes();
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

  onDialogClose(): void {
    this.showDialog = false;
    this.selectedRecipe = undefined;
  }

  // Close menu when clicking outside
  onDocumentClick(): void {
    this.closeMenu();
  }
}
