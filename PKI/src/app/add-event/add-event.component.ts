import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { EventModel } from '../models/event.model';
import { OrganizatorService } from '../services/organizator.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventToAdd!: EventModel;
  selectedImage: boolean = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private organizatorService: OrganizatorService) { }

  form = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      description: new FormControl('', {
        validators: [Validators.required]
      }),
      price: new FormControl('', {
        validators: [Validators.required]
      })
  });

  ngOnInit() {
    const index = this.organizatorService.getNextEventId();
    this.eventToAdd = { id: index, title: '', price: 0, description: '', image: 'placeholder_img.jpg', reviews: [] };
  }

  selectImage(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.eventToAdd!.image = e.target?.result as string; // Set the image URL
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
      this.selectedImage = true;
    }
  }

  onSave() {
    if (this.selectedImage && this.form.valid) {
      this.eventToAdd!.title = this.form.value.name!;
      this.eventToAdd!.price = +this.form.value.price!;
      this.eventToAdd!.description = this.form.value.description!;
      if (this.organizatorService.addEvent(this.eventToAdd!)) {
        this.close.emit();
        window.alert("Uspešno dodavanje događaja!");
      }
      else {
        window.alert("Greška prilikom dodavanja novog događaja!");
      }
    }
  }

  closeAddEvent() {
    if (this.selectedImage || this.form.value.description != '' || this.form.value.name != '' || this.form.value.price != '') {
      let answer = window.confirm("Da li želite da odustanete od dodavanja novog događaja?");
      if (answer) {
        this.close.emit();
      }
    } else {
      this.close.emit();
    }
  }
  
}
