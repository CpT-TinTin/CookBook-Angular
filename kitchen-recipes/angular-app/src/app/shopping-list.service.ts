import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    private apiUrl = 'http://localhost:3000/shoppingList';
    private itemsSubject = new BehaviorSubject<string[]>([]);
    items$ = this.itemsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadItems();
    }

    private loadItems(): void {
        this.http.get<any[]>(this.apiUrl).subscribe(items => {
            this.itemsSubject.next(items.map(i => i.name));
        });
    }

    addItems(newItems: string[]): void {
        // Get current items to check duplicates
        this.http.get<any[]>(this.apiUrl).subscribe(currentItems => {
            const currentNames = new Set(currentItems.map(i => i.name));
            const itemsToAdd = newItems.filter(item => !currentNames.has(item));

            if (itemsToAdd.length === 0) return;

            // Add each new item
            let completed = 0;
            itemsToAdd.forEach(item => {
                this.http.post(this.apiUrl, { name: item }).subscribe(() => {
                    completed++;
                    if (completed === itemsToAdd.length) {
                        this.loadItems();
                    }
                });
            });
        });
    }

    removeItem(item: string): void {
        this.http.get<any[]>(`${this.apiUrl}?name=${encodeURIComponent(item)}`).subscribe(matches => {
            if (matches.length > 0) {
                this.http.delete(`${this.apiUrl}/${matches[0].id}`).subscribe(() => {
                    this.loadItems();
                });
            }
        });
    }

    clearList(): void {
        this.http.get<any[]>(this.apiUrl).subscribe(items => {
            if (items.length === 0) return;

            let completed = 0;
            items.forEach(item => {
                this.http.delete(`${this.apiUrl}/${item.id}`).subscribe(() => {
                    completed++;
                    if (completed === items.length) {
                        this.loadItems();
                    }
                });
            });
        });
    }
}
