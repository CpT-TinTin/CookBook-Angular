import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';



const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthenticated()) {
        return true;
    }
    return router.parseUrl('/login');
};

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register').then(m => m.RegisterComponent)
    },
    {
        path: 'recipes',
        loadComponent: () => import('./recipe-list/recipe-list').then(m => m.RecipeListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'recipes/:id',
        loadComponent: () => import('./recipe-detail/recipe-detail').then(m => m.RecipeDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: 'shopping-list',
        loadComponent: () => import('./shopping-list/shopping-list').then(m => m.ShoppingListComponent),
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
