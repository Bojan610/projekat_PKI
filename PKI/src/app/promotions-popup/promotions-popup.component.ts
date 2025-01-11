import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Event } from '../models/event.model';
import { OrganizatorService } from '../services/organizator.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-promotion-popup',
  imports: [NgFor, FormsModule],
  templateUrl: './promotions-popup.component.html',
  styleUrls: ['./promotions-popup.component.css']
})
export class PopupComponent {
  events: Event[] = [];
  inputValues: string[] = [];
  enableSelect: boolean[] = [];
  @Input({required: true}) promotionId!: string; // Input property
  @Output() close = new EventEmitter<void>();

  constructor(private organizatorService: OrganizatorService) {
    this.events = organizatorService.getEvents();
  }

  onSelectEvent(eventId: string, index: number) {
    if (this.enableSelect[index]) {
      const description = this.inputValues[index];
      if (this.organizatorService.updatePromotion(this.promotionId, eventId, description)) {
        this.closePopup();
      } else {
        alert("Neuspelo biranje promocije!");
      }
    }
  }

  onModelChange(value: string, index: number): void {
    if (value != '') {
      this.enableSelect[index] = true;
    }
    else {
      this.enableSelect[index] = false;
    }
  }

  closePopup() {
    this.close.emit();
  }
}
