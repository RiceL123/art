import { Routes } from '@angular/router';
import { HomePage } from './home/home';
import { GalleryPage } from './gallery/gallery';
import { DirectoryPage } from './directory/directory';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'gallery',
    component: GalleryPage,
  },
  {
    path: 'directory',
    component: DirectoryPage,
  },
];
