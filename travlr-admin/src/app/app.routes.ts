import { Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list';
import { TripEditComponent } from './trips/trip-edit/trip-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripEditComponent },
  { path: 'trips/:id/edit', component: TripEditComponent }
];
