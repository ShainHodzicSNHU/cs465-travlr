import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../../trip';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-list.html',
  styleUrls: ['./trip-list.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

private loadTrips(): void {
  this.tripDataService.getTrips().subscribe({
    next: (trips) => {
      console.log('Trips from API:', trips);
      this.trips = trips;
    },
    error: (err) => {
      console.error('Error loading trips', err);
    }
  });
}


  onAddTrip(): void {
    // we’ll hook this up after we create the edit component
    this.router.navigate(['/trips/new']);
  }

  onEditTrip(trip: Trip): void {
    if (trip._id) {
      this.router.navigate(['/trips', trip._id, 'edit']);
    }
  }

  onDeleteTrip(id: string): void {
    this.tripDataService.deleteTrip(id).subscribe(() => {
      this.loadTrips();
    });
  }
}
