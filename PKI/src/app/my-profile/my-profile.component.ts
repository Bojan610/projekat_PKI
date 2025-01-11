import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { LogInService } from '../services/login.service';
import { ChangePasswordPopupComponent } from "../change-password-popup/change-password-popup.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  imports: [ReactiveFormsModule, ChangePasswordPopupComponent, NgIf],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  @Input({required: true}) userName!: string;
  modifiedUser!: User;
  enableEdit: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  isPopupVisible = false;

  form = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      lastName: new FormControl('', {
        validators: [Validators.required],
      }),
      tel: new FormControl('', {
        validators: [Validators.required]
      }),
      address: new FormControl('', {
        validators: [Validators.required]
      }),
      userName: new FormControl('', {
        validators: [Validators.required]
      })
  });

  constructor(private logInService: LogInService) { }

  ngOnInit() {
      this.modifiedUser = this.logInService.getUser(this.userName);
      if (!this.modifiedUser) {
        window.alert("Došlo je do grešske. Molimo pokušajte ponovo.");
      }
  }

  editInfo(element: HTMLInputElement) {
    element.readOnly = false;
    element.style.backgroundColor = "#fff";
    element.style.cursor = "inherit";
    this.enableEdit = true;
  }

  onSave(myForm: HTMLFormElement) {
    if (this.enableEdit) {
      if (this.logInService.updateUser(this.modifiedUser)) {
        this.successMessage = "Uspešna izmena podataka!";
        this.enableEdit = false;
       
        const inputs = myForm.querySelectorAll('input');
        inputs.forEach((input: HTMLInputElement) => {
          input.readOnly = true;
          input.style.cursor = "not-allowed";
          input.style.backgroundColor = "#BBBBBB";
        });
      } else {
        this.errorMessage = "Neuspešna izmena podataka! Molimo pokušajte ponovo."
      }
    }
  }

  onCancel(myForm: HTMLFormElement) {
    if (this.enableEdit) {
      this.modifiedUser = this.logInService.getUser(this.userName);
      this.enableEdit = false;
      this.successMessage = '';
      this.errorMessage = '';
  
      const inputs = myForm.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        input.readOnly = true;
        input.style.cursor = "not-allowed";
        input.style.backgroundColor = "#BBBBBB";
      });
    }
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

}
