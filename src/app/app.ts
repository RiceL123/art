import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCardComponent, ImageInfo } from './image-card';
import imagesJSON from '../images.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageCardComponent],
  template: `
    <main class="p-6 max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">RiceL123's Art!</h1>

      <div class="masonry mb-12">
        @for (img of images; track img.name) {
          <app-image-card [image]="img" class="break-inside-avoid mb-6 block"></app-image-card>
        }
      </div>

      <router-outlet />
    </main>
  `,
  styles: [`
    .masonry {
      column-count: 1;
      column-gap: 1rem;
    }

    @media (min-width: 640px) {
      .masonry {
        column-count: 2;
      }
    }

    @media (min-width: 1024px) {
      .masonry {
        column-count: 3;
      }
    }

    app-image-card {
      display: inline-block;
      width: 100%;
    }
  `]
})
export class App {
  images: ImageInfo[] = Object.entries(imagesJSON).map(([key, val]) => ({
    path: key,
    name: key
      .split('/')
      .pop()!
      .replace(/\.[^/.]+$/, ''),
    created_at: new Date(val.created_at),
    tags: val.tags,
    description: val.description,
  }));
}
