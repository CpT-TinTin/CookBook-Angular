import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shopping-list.html',
    styleUrl: './shopping-list.css'
})
export class ShoppingListComponent {
    items$;

    constructor(private shoppingListService: ShoppingListService) {
        this.items$ = this.shoppingListService.items$;
    }

    removeItem(item: string): void {
        this.shoppingListService.removeItem(item);
    }

    clearList(): void {
        if (confirm('Sigur doriți să ștergeți toată lista?')) {
            this.shoppingListService.clearList();
        }
    }

    downloadText(): void {
        this.items$.subscribe(items => {
            const text = "Listă de Cumpărături:\n\n" + items.map(i => `- ${i}`).join('\n');
            const blob = new Blob([text], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lista-cumparaturi.txt';
            a.click();
            window.URL.revokeObjectURL(url);
        }).unsubscribe();
    }

    printList(): void {
        window.print();
    }
}
