import { Component, computed, input } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { TagComponent } from './tag';

export interface ImageInfo {
  path: string;
  name: string;
  created_at: Date;
  tags: string[];
  description: string;
}

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [DatePipe, TagComponent, NgOptimizedImage],
  template: `
    <div class="card">
      <img
        [ngSrc]="imgSrc()"
        [alt]="image().name"
        class="preview w-full h-auto"
        height="250"
        width="250"
      />
      <div class="content">
        <h3>{{ image().name }}</h3>
        <p class="date">{{ image().created_at | date: 'medium' }}</p>
        <div class="flex flex-wrap gap-1">
          @for (tag of image().tags; track tag) {
            <app-tag label="tag" (clicked)="onTagClick($event)"></app-tag>
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

  imgSrc = computed(
    () => `https://raw.githubusercontent.com/ricel123/art/master/images/${this.image().path}`,
  );

  onTagClick(tag: string) {
    console.log('Tag clicked:', tag);
  }
}
