import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'app-event-change-popup',
  imports: [ReactiveFormsModule],
  templateUrl: './event-change-popup.component.html',
  styleUrl: './event-change-popup.component.css'
})
export class EventChangePopupComponent implements OnInit {
  @Input({required: true}) modifiedEvent?: EventModel;
  @Output() close = new EventEmitter<void>();
  @Output() formParameters = new EventEmitter<{ name: string; price: number; description: string }>();
  errorMessage = '';

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    price: new FormControl('', {
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      validators: [Validators.required]
    })
  });

  ngOnInit() {
    this.form.patchValue({
      name: this.modifiedEvent?.title,
      price: this.modifiedEvent?.price?.toString(),
      description: this.modifiedEvent?.description
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.errorMessage = "Neispravno uneti podaci!";
    } 
    else {
      const formParam = { name: this.form.value.name!, price: +this.form.value.price!, description: this.form.value.description! };
      this.formParameters.emit(formParam);
    }
  }

  closePopup() {
    this.close.emit();
  }
}
