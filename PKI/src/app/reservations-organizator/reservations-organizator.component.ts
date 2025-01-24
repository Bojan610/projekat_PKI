import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-reservations-organizator',
  imports: [NgFor],
  templateUrl: './reservations-organizator.component.html',
  styleUrl: './reservations-organizator.component.css'
})
export class ReservationsOrganizatorComponent {
  reservations: Reservation[] = []; 

  constructor(private organizatorService: OrganizatorService) { }

  ngOnInit() {
    this.reservations = this.organizatorService.getReservationsOrg();
  }

  acceptReservation(reservation: Reservation) {
    if (this.organizatorService.acceptReservation(reservation)) {
      this.reservations = this.organizatorService.getReservationsOrg();
    } else {
      window.alert("Greška prilikom odbijanja događaja. Pokušajte ponovo.")
    }
  }

  declineReservation(reservation: Reservation) {
    if (this.organizatorService.declineReseration(reservation)) {
      this.reservations = this.organizatorService.getReservationsOrg();
    } else {
      window.alert("Greška prilikom odbijanja događaja. Pokušajte ponovo.")
    }
  }
}
