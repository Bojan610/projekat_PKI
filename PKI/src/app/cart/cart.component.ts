import { Component } from '@angular/core';
import { CartItem } from '../models/cartItem.model';
import { OrganizatorService } from '../services/organizator.service';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LogInService } from '../services/login.service';

@Component({
  selector: 'app-cart',
  imports: [NgFor, ReactiveFormsModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = []; 
  selectedDate: Date[] = [];
  selectedOption: string[] = [];

  constructor(private organizatorService: OrganizatorService, private logInService: LogInService) { }

  options = [
    { value: '10', viewValue: '10' },
    { value: '20', viewValue: '20' },
    { value: '30', viewValue: '30' },
    { value: '40', viewValue: '40' },
    { value: '50', viewValue: '50' },
  ];


  ngOnInit() {
    this.cartItems = this.organizatorService.getCartItems();
  }
  

  reserveEvent(cartItem: CartItem) {
    if (cartItem.eventDate && cartItem.numOfGuest) {
      const user = this.logInService.getUser(sessionStorage.getItem('user')!);
      if (this.organizatorService.reserveEvent(cartItem, user)) {
        this.cartItems = this.organizatorService.getCartItems();
        window.alert("Događaj uspešno rezervisan!");
      } else {
        window.alert("Greška prilokom rezervacije događaja. Pokušajte ponovo.");
      }
    }
  }

  removeEvent(cartItemId: string) {
    if (this.organizatorService.removeCartItem(cartItemId)) {
      this.cartItems = this.organizatorService.getCartItems();
    } else {
      window.alert("Greška prilikom brisanja događaja iz korpe. Pokušajte ponovo.")
    }
  }

}
