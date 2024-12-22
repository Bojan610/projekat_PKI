import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogInService } from '../services/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LogInComponent {
  form = new FormGroup({
    korisnickoIme: new FormControl('', {
      validators: [Validators.required]
    }),
    lozinka: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  constructor(private logInService: LogInService) { }

  get usernameIsInvalid() {
    return this.form.controls.korisnickoIme.touched && this.form.controls.korisnickoIme.invalid
  }

  get passwordIsInvalid() {
    return this.form.controls.lozinka.touched && this.form.controls.lozinka.invalid
  }

  onSubmit() {
    if (!this.form.controls.korisnickoIme.invalid && !this.form.controls.lozinka.invalid) {
      const enteredUsername = this.form.value.korisnickoIme;
      const enteredPassword = this.form.value.lozinka;
  
      this.logInService.logIn(enteredUsername!, enteredPassword!);
    }
  }

}
