import { Component } from '@angular/core';
import { OrganizatorService } from '../services/organizator.service';
import { EventModel } from '../models/event.model';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventDetailsComponent } from "../event-details/event-details.component";
import { AddEventComponent } from "../add-event/add-event.component";

@Component({
  selector: 'app-events',
  imports: [NgFor, NgIf, NgxPaginationModule, EventDetailsComponent, AddEventComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: EventModel[] = [];
  pageSize = 3; // Number of events per page
  currentPage = 1;
  eventToChange = '';
  addEvent: boolean = false;

  constructor(private organizatorService: OrganizatorService) {
      this.events = organizatorService.getEvents();
  }

  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.events.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.events.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  removeEvent(eventId: string) {
    let answer = window.confirm("Da li zaista želite da obrišete ovaj događaj?");
    if (answer) {
      if (this.organizatorService.removeEvent(eventId)) {
        window.alert("Događaj uspešno obrisan!");
      } else {
        window.alert("Greška prilikom brisanja događaja!");
      }
      this.events = this.organizatorService.getEvents();
    }
  }

  changeEvent(eventId: string) {
    this.eventToChange = eventId;
  }

  onAddEvent() {
    this.addEvent = true;
  }

  closeEvent() {
    this.eventToChange = '';
    this.addEvent = false;
    this.events = this.organizatorService.getEvents();
  }

}
