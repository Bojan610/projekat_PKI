import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventModel } from '../models/event.model';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor, NgIf } from '@angular/common';
import { AboutUsComponent } from "../about-us/about-us.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-details-kupac',
  imports: [NgIf, NgFor, AboutUsComponent, ReactiveFormsModule],
  templateUrl: './event-details-kupac.component.html',
  styleUrl: './event-details-kupac.component.css'
})
export class EventDetailsKupacComponent {
  @Input({required: true}) eventToOpen!: string;
  @Output() close = new EventEmitter<void>();
  event?: EventModel;
  showAboutUs: boolean = false;
  stars = [1, 2, 3, 4, 5]; // Array for 5 stars
  rating = 0; // Selected rating

  constructor(private organizatorService: OrganizatorService) { }

  form = new FormGroup({
    description: new FormControl('', {
      validators: [Validators.required]
    })
  });

  ngOnInit() {
    this.event = {...this.organizatorService.getEventById(this.eventToOpen)!};
    if (!this.event) {
      window.alert("Došlo je do greške. Molimo pokušajte ponovo.");
    }
  }

  addToCart() {
    if (this.organizatorService.addToCart(this.eventToOpen)) {
      window.alert("Događaj uspešno dodat u korpu!");
    } else {
      window.alert("Greška prilikom dodavanja događaja u korpu.");
    }
  }

  closeEvent() {
    this.close.emit();
  }

  openAbout() {
    this.showAboutUs = true;
  }

  closeAbout() {
    this.showAboutUs = false;
  }

  setRating(value: number): void {
    this.rating = value; // Set the rating when a star is clicked
  }
  
  onSubmitComment() {
    console.log(this.form.value.description);
  }

}
