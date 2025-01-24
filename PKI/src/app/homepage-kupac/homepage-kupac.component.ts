import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { Promotion } from '../models/promotion.model';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-homepage-kupac',
  imports: [NgFor],
  templateUrl: './homepage-kupac.component.html',
  styleUrl: './homepage-kupac.component.css'
})
export class HomepageKupacComponent {
    promotions: Promotion[] = [];
    currentIndex: number = 0;
    intervalId: any;
  
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
  
    ngOnDestroy(): void {
      clearInterval(this.intervalId);
    }
}
