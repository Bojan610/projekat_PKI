import { Component } from '@angular/core';
import { OrganizatorService } from '../services/organizator.service';
import { Reservation } from '../models/reservation';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reservations',
  imports: [NgFor],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  reservations: Reservation[] = []; 

 constructor(private organizatorService: OrganizatorService) { }

  ngOnInit() {
    this.reservations = this.organizatorService.getReservations();
  } 
}
