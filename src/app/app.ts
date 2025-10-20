import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCardComponent, ImageInfo } from "./image-card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImageCardComponent],
  template: `
    <h1>RiceL123's Art!</h1>

    @for (img of images; track img.name) {
      <app-image-card [image]="img"></app-image-card>
    }

    <router-outlet />  
  `
})
export class App {
  images: ImageInfo[] = [
    {
      path: 'assets/cat.jpg',
      name: 'Cat with Book',
      created_at: new Date('2024-10-01'),
      media: [],
      tags: ['cat', 'book', 'funny']
    },
    {
      path: 'assets/dog.jpg',
      name: 'Dog with Laptop',
      created_at: new Date('2024-11-15'),
      media: [],
      tags: ['dog', 'tech']
    }
  ];
}