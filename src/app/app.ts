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

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        @for (img of images; track img.name) {
          <app-image-card
            [image]="img"
            class="card bg-base-200 shadow-md hover:shadow-xl transition"
          ></app-image-card>
        }
      </div>

      <router-outlet />
    </main>
  `,
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
