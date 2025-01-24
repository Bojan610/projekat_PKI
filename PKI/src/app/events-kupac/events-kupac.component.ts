import { Component } from '@angular/core';
import { EventModel } from '../models/event.model';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor, NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EventDetailsKupacComponent } from "../event-details-kupac/event-details-kupac.component";

@Component({
  selector: 'app-events-kupac',
  imports: [NgIf, NgFor, NgxPaginationModule, EventDetailsKupacComponent],
  templateUrl: './events-kupac.component.html',
  styleUrl: './events-kupac.component.css'
})
export class EventsKupacComponent {
  events: EventModel[] = [];
  pageSize = 3; // Number of events per page
  currentPage = 1;
  eventReview: boolean[] = [];
  eventToOpen = '';

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

  onEventReview(eventId: string) {
    this.eventReview[+eventId] = !this.eventReview[+eventId];
  }

  openEvent(eventId: string) {
    this.eventToOpen = eventId;
    this.eventReview[+eventId] = !this.eventReview[+eventId];
  }

  closeEvent() {
    this.eventToOpen = '';
  }
}
