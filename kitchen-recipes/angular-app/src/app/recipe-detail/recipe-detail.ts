import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { FormsModule } from '@angular/forms';
import { Recipe, Comment } from '../models';
import { ShoppingListService } from '../shopping-list.service';
import { MealPlanService } from '../meal-plan.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | undefined;
  showMenu = false;
  showMealPlanModal = false;
  selectedDay = 'Luni';
  selectedType = 'Prânz';
  days: string[] = [];
  mealTypes: string[] = [];
  nutritionData: { calories: number, protein: number, carbs: number, fat: number } | null = null;

  newReviewText: string = '';
  newReviewRating: number = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private mealPlanService: MealPlanService,
    private toastService: ToastService
  ) { }

  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.days = this.mealPlanService.getDays();
    this.mealTypes = this.mealPlanService.getMealTypes();

    const id = this.route.snapshot.paramMap.get('id');
    console.log('RecipeDetail initialized with ID:', id);

    if (id) {
      this.recipeService.getRecipe(id).subscribe({
        next: (recipe) => {
          console.log('Recipe loaded:', recipe);
          this.recipe = recipe;
          this.isLoading = false;
          if (recipe.ingredients) {
            this.recipeService.getNutrition(recipe.ingredients).subscribe(data => {
              this.nutritionData = data;
            });
          }
        },
        error: (err) => {
          console.error('Error loading recipe:', err);
          this.error = 'Nu s-a putut încărca rețeta.';
          this.isLoading = false;
          // this.router.navigate(['/recipes']); // Disable redirect for debugging
        }
      });
    } else {
      this.error = 'ID invalid';
      this.isLoading = false;
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleFavorite(): void {
    if (this.recipe) {
      this.recipeService.toggleFavorite(this.recipe.id);
      // Refresh local state
      this.recipeService.getRecipe(this.recipe.id).subscribe(updated => {
        this.recipe = updated;
      });
      this.showMenu = false;
    }
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.shoppingListService.addItems(this.recipe.ingredients);
      this.toastService.show('Ingrediente adăugate în lista de cumpărături!', 'success');
      this.showMenu = false;
    }
  }

  printRecipe(): void {
    this.toastService.show('Se pregătește imprimarea pentru: ' + this.recipe?.title, 'info');
    this.showMenu = false;
  }

  openMealPlanModal(): void {
    this.showMealPlanModal = true;
    this.showMenu = false;
  }

  closeMealPlanModal(): void {
    this.showMealPlanModal = false;
  }

  addToMealPlan(): void {
    if (this.recipe) {
      this.mealPlanService.addMeal(this.selectedDay, this.selectedType, this.recipe.id, this.recipe.title);
      this.toastService.show(`Rețeta adăugată pentru ${this.selectedDay} - ${this.selectedType}`, 'success');
      this.closeMealPlanModal();
    }
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }

  get averageRating(): number {
    if (!this.recipe || !this.recipe.ratings || this.recipe.ratings.length === 0) {
      return 0;
    }
    const sum = this.recipe.ratings.reduce((a, b) => a + b, 0);
    return sum / this.recipe.ratings.length;
  }

  submitReview(): void {
    if (this.recipe && this.newReviewText.trim()) {
      const newComment: Comment = {
        user: 'Utilizator', // Hardcoded for now, waiting for Auth
        text: this.newReviewText,
        rating: this.newReviewRating,
        date: new Date()
      };

      this.recipeService.addReview(this.recipe.id, newComment);

      // Reset form
      this.newReviewText = '';
      this.newReviewRating = 5;
      this.toastService.show('Recenzia a fost adăugată!', 'success');

      // Update local recipe mainly to show instant feedback, although observable in addReview triggers update
      this.recipeService.getRecipe(this.recipe.id).subscribe(updated => {
        this.recipe = updated;
      });
    }
  }
}
