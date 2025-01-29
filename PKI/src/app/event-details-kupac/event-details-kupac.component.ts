import { Component, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { EventModel } from '../models/event.model';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor, NgIf } from '@angular/common';
import { AboutUsComponent } from "../about-us/about-us.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../models/review.model';
import { LogInService } from '../services/login.service';

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
  slidesPerView = 3;
  intervalId: any;
  stars = [1, 2, 3, 4, 5]; // Array for 5 stars
  rating = 0; // Selected rating
  reviewLeft: boolean = false;

  constructor(private organizatorService: OrganizatorService, private logInService: LogInService) { }

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
      this.startInterval();
      const user = sessionStorage.getItem('user');
      for (const review of this.event.reviews) {
        if (review.username === user) {
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

  startInterval() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  updateSlidesPerView() {
    const screenWidth = window.innerWidth;
    this.slidesPerView = screenWidth < 768 ? 1 : 3;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % (this.event!.reviews.length - this.slidesPerView + 1);
    clearInterval(this.intervalId);
    this.startInterval();
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex + this.event!.reviews.length - this.slidesPerView) % (this.event!.reviews.length - this.slidesPerView + 1);
    clearInterval(this.intervalId);
    this.startInterval();
  }  

  setRating(value: number): void {
    this.rating = value; // Set the rating when a star is clicked
  }
  
  onSubmitReview() {
    if (this.rating && this.form.valid) {
      const index = this.event?.reviews.length;
      const user = this.logInService.getUser(sessionStorage.getItem('user')!);
      if (this.organizatorService.leaveReview(this.event!.id, { reviewId: index!.toString(), user: user.firstName + ' ' + user.lastName[0] + '.', username: user.userName, rating: this.rating, comment: this.form.value.description!})) {
        this.reviewLeft = true;
        this.startInterval();
      } else {
        window.alert("Greška prilikom ostavljanja komentara. Pokušajte ponovo.");
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
