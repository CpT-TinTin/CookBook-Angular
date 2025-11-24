import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models';

@Component({
  selector: 'app-recipe-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-dialog.html',
  styleUrl: './recipe-dialog.css'
})
export class RecipeDialogComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
  @Output() close = new EventEmitter<void>();

  recipeForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
      cookingTime: [null, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required]
    });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient(value: string = '') {
    this.ingredients.push(this.fb.control(value, Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addStep(value: string = '') {
    this.steps.push(this.fb.control(value, Validators.required));
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  ngOnInit(): void {
    if (this.recipe) {
      this.isEditMode = true;
      this.recipeForm.patchValue({
        title: this.recipe.title,
        description: this.recipe.description,
        cookingTime: this.recipe.cookingTime,
        imageUrl: this.recipe.imageUrl
      });

      this.recipe.ingredients.forEach(ing => this.addIngredient(ing));
      this.recipe.steps.forEach(step => this.addStep(step));
    } else {
      // Add one empty field by default
      this.addIngredient();
      this.addStep();
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const recipeData = {
        title: formValue.title,
        description: formValue.description,
        ingredients: formValue.ingredients,
        steps: formValue.steps,
        cookingTime: formValue.cookingTime,
        imageUrl: formValue.imageUrl,
        isFavorite: this.recipe ? this.recipe.isFavorite : false
      };

      if (this.isEditMode && this.recipe) {
        this.recipeService.updateRecipe({ ...recipeData, id: this.recipe.id });
      } else {
        this.recipeService.addRecipe(recipeData);
      }
      this.close.emit();
    }
  }

  onCancel(): void {
    this.close.emit();
  }
}
