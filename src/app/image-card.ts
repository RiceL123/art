import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TagComponent } from './tag';

export interface ImageInfo {
  path: string;
  name: string;
  created_at: Date;
  media: string[];
  tags: string[];
}

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [DatePipe, TagComponent],
  template: `
    <div class="card">
      <img [src]="image().path" [alt]="image().name" class="preview" />
      <div class="content">
        <h3>{{ image().name }}</h3>
        <p class="date">{{ image().created_at | date:'medium' }}</p>
        <div class="flex flex-wrap gap-1">
          @for (tag of image().tags; track tag) {
            <app-tag [label]="tag" (clicked)="onTagClick($event)"></app-tag>
          } @empty {
            <div>no tags homie</div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ImageCardComponent {
  image = input.required<ImageInfo>();

  onTagClick(tag: string) {
    console.log('Tag clicked:', tag);
  }
}