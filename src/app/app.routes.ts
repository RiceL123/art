import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { GalleryComponent } from './gallery';
import { DirectoryComponent } from './directory';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'directory',
    component: DirectoryComponent,
  },
];
