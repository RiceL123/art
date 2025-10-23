import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="p-6">
      <h1>Welcome to My Site</h1>
      <p>This is the homepage of my Angular app.</p>
    </section>
  `,
})
export class HomeComponent {}
