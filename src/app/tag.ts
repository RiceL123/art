import { Component, EventEmitter, Output, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <span class="badge badge-soft badge-primary hover:badge-secondary" (click)="handleClick()">
      {{ label() }}
    </span>
  `
})
export class TagComponent {
  label = input.required<string>();

  @Output() clicked = new EventEmitter<string>();

  handleClick() {
    this.clicked.emit(this.label());
  }
}
