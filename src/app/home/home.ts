import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GraphComponent } from './graph';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, GraphComponent],
  template: `
    <section class="p-6">
      <h1>Welcome to My Site</h1>
      <p>This is the homepage of my Angular app to showcase some art???</p>
      <img
        ngSrc="mambo.webp"
        alt="mambo"
        height="1504"
        width="948"
        priority
        class="relative z-10"
      />
      <app-graph class="absolute top-4 right-4 z-0"></app-graph>
    </section>
  `,
})
export class HomePage {}
