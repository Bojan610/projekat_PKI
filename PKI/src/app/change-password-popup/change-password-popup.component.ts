import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogInService } from '../services/login.service';


function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
  
    if (val1 === val2) {
      return null;
    }
  
    return {passwordsNowEqual: true};
  }
}

@Component({
  selector: 'app-change-password-popup',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password-popup.component.html',
  styleUrl: './change-password-popup.component.css'
})
export class ChangePasswordPopupComponent {
  @Input({required: true}) userName?: string;
  @Output() close = new EventEmitter<void>();
  errorMessage = '';

  constructor(private logInService: LogInService) { }

 form = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  }, {
    validators: [equalValues('password', 'confirmPassword')]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = "Neispravno uneti podaci! Lozinke se moraju poklapati.";
    } else {
      if (this.logInService.updatePassword(this.userName, this.form.value.password!)) {
        this.errorMessage = '';
        window.alert("Uspešna izmena lozinke!");
        this.closePopup();
      } else {
        this.errorMessage = "Neuspešna izmena podataka! Molimo pokušajte ponovo.";
      }
    }
  }

  closePopup() {
    this.close.emit();
  }
}
