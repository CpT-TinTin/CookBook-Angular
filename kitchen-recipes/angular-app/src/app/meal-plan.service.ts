
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MealPlanAction {
    day: string; // 'Monday', 'Tuesday', ...
    type: string; // 'Breakfast', 'Lunch', 'Dinner'
    recipeId: string;
    recipeTitle: string;
}

@Injectable({
    providedIn: 'root'
})
export class MealPlanService {
    private storageKey = 'cookbook_meal_plan';
    // Structure: { 'Monday': { 'Breakfast': { id: '1', title: 'Eggs' } } }
    private planSubject = new BehaviorSubject<any>({});
    plan$ = this.planSubject.asObservable();

    constructor() {
        this.loadPlan();
    }

    private loadPlan(): void {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.planSubject.next(JSON.parse(saved));
        } else {
            this.initEmptyPlan();
        }
    }

    private initEmptyPlan(): void {
        const emptyPlan: any = {};
        const days = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
        days.forEach(day => {
            emptyPlan[day] = {
                'Mic Dejun': null,
                'Prânz': null,
                'Cină': null
            };
        });
        this.savePlan(emptyPlan);
    }

    private savePlan(plan: any): void {
        localStorage.setItem(this.storageKey, JSON.stringify(plan));
        this.planSubject.next(plan);
    }

    addMeal(day: string, type: string, recipeId: string, recipeTitle: string): void {
        const currentPlan = this.planSubject.value;
        if (!currentPlan[day]) currentPlan[day] = {};

        currentPlan[day][type] = { id: recipeId, title: recipeTitle };
        this.savePlan(currentPlan);
    }

    removeMeal(day: string, type: string): void {
        const currentPlan = this.planSubject.value;
        if (currentPlan[day]) {
            currentPlan[day][type] = null;
            this.savePlan(currentPlan);
        }
    }

    getDays(): string[] {
        return ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
    }

    getMealTypes(): string[] {
        return ['Mic Dejun', 'Prânz', 'Cină'];
    }
}
