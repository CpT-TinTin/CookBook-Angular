import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Recipe } from './models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'Paste Carbonara',
      description: 'O rețetă clasică italiană, rapidă și delicioasă.',
      ingredients: ['Spaghete', 'Ouă', 'Pancetta', 'Parmesan', 'Piper'],
      steps: ['Fierbeți pastele.', 'Prăjiți pancetta.', 'Amestecați ouăle cu parmesan.', 'Combinați totul.'],
      cookingTime: 20,
      imageUrl: 'https://placehold.co/600x400?text=Carbonara',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Salată Caesar',
      description: 'Salată proaspătă cu pui și crutoane.',
      ingredients: ['Salată Romaine', 'Piept de pui', 'Crutoane', 'Dressing Caesar', 'Parmesan'],
      steps: ['Gătiți puiul.', 'Tăiați salata.', 'Adăugați crutoanele și dressingul.'],
      cookingTime: 15,
      imageUrl: 'https://placehold.co/600x400?text=Caesar',
      isFavorite: true
    }
  ];

  private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);
  recipes$ = this.recipesSubject.asObservable();

  constructor() { }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes$;
  }

  getRecipe(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): void {
    const newRecipe = { ...recipe, id: Date.now().toString() };
    this.recipes = [...this.recipes, newRecipe];
    this.recipesSubject.next(this.recipes);
  }

  updateRecipe(updatedRecipe: Recipe): void {
    this.recipes = this.recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    this.recipesSubject.next(this.recipes);
  }

  deleteRecipe(id: string): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.recipesSubject.next(this.recipes);
  }

  toggleFavorite(id: string): void {
    const recipe = this.recipes.find(r => r.id === id);
    if (recipe) {
      this.updateRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
    }
  }
}
