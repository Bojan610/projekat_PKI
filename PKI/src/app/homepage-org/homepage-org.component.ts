import { Component, inject, Input } from '@angular/core';
import { User } from '../models/user.model';
import { HeaderComponent } from "../header/header.component";
import { OrganizatorService } from '../services/organizator.service';
import { Promotion } from '../models/promotion.model';
import { NgFor, NgIf } from '@angular/common';
import { PopupComponent } from "../promotions-popup/promotions-popup.component";

@Component({
  selector: 'app-homepage-org',
  imports: [NgFor, NgIf, PopupComponent],
  templateUrl: './homepage-org.component.html',
  styleUrl: './homepage-org.component.css'
})
export class HomepageOrgComponent {
  
  promotions: Promotion[] = [];
  currentIndex: number = 0;
  intervalId: any;
  isPopupVisible = false;
  promotionToChange: string = '';

  constructor(private organizatorService: OrganizatorService) {
    this.promotions = organizatorService.getPromotions();
  }

  ngOnInit(): void {
    this.startInterval();
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.promotions.length;
    clearInterval(this.intervalId);
    this.startInterval();
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.promotions.length) % this.promotions.length;
    clearInterval(this.intervalId);
    this.startInterval();
  }  

  onSelectSlide(id: string) {
    this.currentIndex = +id;
    clearInterval(this.intervalId);
    this.startInterval();
  }

  openPopup(promotionId: string) {
    this.promotionToChange = promotionId;
    this.isPopupVisible = true;
    clearInterval(this.intervalId);
  }

  closePopup() {
    this.isPopupVisible = false;
    this.promotions = this.organizatorService.getPromotions();
    this.startInterval();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
