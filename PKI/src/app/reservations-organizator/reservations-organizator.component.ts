import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor } from '@angular/common';
import { LogInService } from '../services/login.service';

@Component({
  selector: 'app-reservations-organizator',
  imports: [NgFor],
  templateUrl: './reservations-organizator.component.html',
  styleUrl: './reservations-organizator.component.css'
})
export class ReservationsOrganizatorComponent {
  reservations: Reservation[] = []; 

  constructor(private organizatorService: OrganizatorService, private logInService: LogInService) { }

  ngOnInit() {
    this.reservations = this.organizatorService.getReservationsOrg();
  }

  acceptReservation(reservation: Reservation) {
    const user = this.logInService.getUser(sessionStorage.getItem('user')!);
    if (this.organizatorService.acceptReservation(user, reservation)) {
      this.reservations = this.organizatorService.getReservationsOrg();
    } else {
      window.alert("Greška prilikom odbijanja događaja. Pokušajte ponovo.")
    }
  }

  declineReservation(reservation: Reservation) {
    const user = this.logInService.getUser(sessionStorage.getItem('user')!);
    if (this.organizatorService.declineReseration(user, reservation)) {
      this.reservations = this.organizatorService.getReservationsOrg();
    } else {
      window.alert("Greška prilikom odbijanja događaja. Pokušajte ponovo.")
    }
  }
}
