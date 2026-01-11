import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './models';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.http.get<Recipe[]>(this.apiUrl).subscribe(recipes => {
      this.recipesSubject.next(recipes);
    });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipes$;
  }

  getRecipe(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): void {
    const newRecipe = { ...recipe, id: Date.now().toString() };
    this.http.post<Recipe>(this.apiUrl, newRecipe).subscribe(() => {
      this.loadRecipes();
    });
  }

  updateRecipe(updatedRecipe: Recipe): void {
    this.http.put<Recipe>(`${this.apiUrl}/${updatedRecipe.id}`, updatedRecipe).subscribe(() => {
      this.loadRecipes();
    });
  }

  deleteRecipe(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadRecipes();
    });
  }

  toggleFavorite(id: string): void {
    this.getRecipe(id).subscribe(recipe => {
      if (recipe) {
        const updatedRecipe = { ...recipe, isFavorite: !recipe.isFavorite };
        this.updateRecipe(updatedRecipe);
      }
    });
  }
}
