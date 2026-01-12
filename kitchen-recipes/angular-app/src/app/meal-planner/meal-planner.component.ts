import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealPlanService } from '../meal-plan.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-meal-planner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './meal-planner.component.html',
    styleUrl: './meal-planner.component.css'
})
export class MealPlannerComponent implements OnInit {
    days: string[] = [];
    mealTypes: string[] = [];
    plan: any = {};

    constructor(private mealPlanService: MealPlanService, private router: Router) { }

    ngOnInit(): void {
        this.days = this.mealPlanService.getDays();
        this.mealTypes = this.mealPlanService.getMealTypes();

        this.mealPlanService.plan$.subscribe(plan => {
            this.plan = plan;
        });
    }

    removeMeal(day: string, type: string): void {
        if (confirm('Sigur vrei să elimini această rețetă din plan?')) {
            this.mealPlanService.removeMeal(day, type);
        }
    }

    goToRecipe(id: string): void {
        this.router.navigate(['/recipe', id]);
    }
}
