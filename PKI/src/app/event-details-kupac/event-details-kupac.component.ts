import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
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
  currentIndex = 0;
  slidesPerView = 3; // Default for desktop
  stars = [1, 2, 3, 4, 5]; // Array for 5 stars
  rating = 0; // Selected rating
  reviewLeft: boolean = false;

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
    } else {
      this.updateSlidesPerView();
      const user = sessionStorage.getItem('user');
      for (const review of this.event.reviews) {
        if (review.user === user) {
            this.reviewLeft = true;
            break;
        }
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSlidesPerView();
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

  updateSlidesPerView() {
    this.slidesPerView = window.innerWidth < 768 ? 1 : 3;
  }

  getTransformStyle() {
    return `translateX(-${this.currentIndex * (100 / this.slidesPerView)}%)`;
  }

  getWrapperWidth() {
    return `${(this.event!.reviews.length / this.slidesPerView) * 100}%`;
  }

  nextSlide() {
    if (this.currentIndex < this.event!.reviews.length - this.slidesPerView) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  setRating(value: number): void {
    this.rating = value; // Set the rating when a star is clicked
  }
  
  onSubmitReview() {
    if (this.rating && this.form.valid) {
      const index = this.event?.reviews.length;
      const user = sessionStorage.getItem('user');
      if (this.organizatorService.leaveReview(this.event!.id, { reviewId: index!.toString(), user: user!, rating: this.rating, comment: this.form.value.description!})) {
        this.reviewLeft = true;
      } else {
        window.alert("Greška prilikom ostavljanja komentara. Pokušajte ponovo.");
      }
    }
  }

}
