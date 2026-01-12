import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="toastService.toast$ | async as toast" class="toast" [ngClass]="toast.type">
      {{ toast.message }}
    </div>
  `,
    styles: [`
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 1rem 2rem;
      border-radius: 8px;
      color: white;
      animation: slideIn 0.3s ease;
      z-index: 1000;
    }
    .success { background-color: #2ecc71; }
    .error { background-color: #e74c3c; }
    .info { background-color: #3498db; }
    @keyframes slideIn {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
    constructor(public toastService: ToastService) { }
}
