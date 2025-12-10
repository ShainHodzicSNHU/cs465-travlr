import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../../trip';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-edit.html',
  styleUrls: ['./trip-edit.css']
})
export class TripEditComponent implements OnInit {
  trip: Trip = {
    code: '',
    name: '',
    length: 0,
    start: '',
    resort: '',
    perPerson: 0,
    image: '',
    description: ''
  };

  isNew = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isNew = false;
      this.tripDataService.getTripById(id).subscribe(trip => {
        this.trip = trip;
      });
    }
  }

  onSubmit(): void {
    if (this.isNew) {
      this.tripDataService.addTrip(this.trip).subscribe(() => {
        this.router.navigate(['/trips']);
      });
    } else if (this.trip._id) {
      this.tripDataService.updateTrip(this.trip._id, this.trip).subscribe(() => {
        this.router.navigate(['/trips']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/trips']);
  }
}
