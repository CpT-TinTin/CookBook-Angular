import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private items: string[] = [];
    private itemsSubject = new BehaviorSubject<string[]>([]);
    items$ = this.itemsSubject.asObservable();

    constructor() {
        const saved = localStorage.getItem('shoppingList');
        if (saved) {
            this.items = JSON.parse(saved);
            this.itemsSubject.next(this.items);
        }
    }

    addItems(newItems: string[]): void {
        // Avoid duplicates
        const uniqueItems = new Set([...this.items, ...newItems]);
        this.items = Array.from(uniqueItems);
        this.updateState();
    }

    removeItem(item: string): void {
        this.items = this.items.filter(i => i !== item);
        this.updateState();
    }

    clearList(): void {
        this.items = [];
        this.updateState();
    }

    private updateState(): void {
        localStorage.setItem('shoppingList', JSON.stringify(this.items));
        this.itemsSubject.next(this.items);
    }
}
