import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { OrganizatorService } from '../services/organizator.service';
import { EventModel } from '../models/event.model';
import { EventChangePopupComponent } from "../event-change-popup/event-change-popup.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [EventChangePopupComponent, NgIf, NgFor],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {
  @Input({required: true}) eventToChange!: string;
  @Output() close = new EventEmitter<void>();
  modifiedEvent?: EventModel;
  enableEdit: boolean = false;
  isPopupVisible = false;
  successMessage = '';
  errorMessage = '';
  currentIndex = 0;
  slidesPerView = 3;
  intervalId: any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private organizatorService: OrganizatorService) { }

  ngOnInit() {
    this.modifiedEvent = {...this.organizatorService.getEventById(this.eventToChange)!};
    if (!this.modifiedEvent) {
      window.alert("Došlo je do greške. Molimo pokušajte ponovo.");
    } else {
      this.updateSlidesPerView();
      this.startInterval();
    }
  }

   @HostListener('window:resize')
    onResize() {
      this.updateSlidesPerView();
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
        this.modifiedEvent!.image = e.target?.result as string; // Set the image URL
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
      this.enableEdit = true;
    }
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  enteredInfo(obj: { name: string; price: number, description: string }) {
    this.modifiedEvent!.title = obj.name;
    this.modifiedEvent!.price = obj.price;
    this.modifiedEvent!.description = obj.description;
    this.isPopupVisible = false;
    this.enableEdit = true;
  }

  closePopup() {
    this.isPopupVisible = false
  }

  onSave() {
    if (this.enableEdit) {
      if (this.organizatorService.updateEvent(this.modifiedEvent!)) {
        this.successMessage = 'Uspešna izmena događaja!';
        this.enableEdit = false;
      }
      else {
        this.errorMessage = 'Neuspešna izmena događaja! Pokušajte ponovo.';
      }
    }
  }

  onCancel() {
    if (this.enableEdit) {
      let answer = window.confirm("Da li želite da odustanete od izmene događaja?");
      if (answer) {
        this.modifiedEvent = {...this.organizatorService.getEventById(this.eventToChange)!};
        if (!this.modifiedEvent) {
          window.alert("Došlo je do grešske. Molimo pokušajte ponovo.");
        }
        this.enableEdit = false;
      }
    }
  }

  closeEvent() {
    if (this.enableEdit) {
      let answer = window.confirm("Da li želite da odustanete od izmene događaja?");
      if (answer) {
        this.modifiedEvent = {...this.organizatorService.getEventById(this.eventToChange)!};
        if (!this.modifiedEvent) {
          window.alert("Došlo je do grešske. Molimo pokušajte ponovo.");
        }
        this.enableEdit = false;
        this.close.emit();
      }
    } else {
      this.close.emit();
    }
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
    this.currentIndex = (this.currentIndex + 1) % (this.modifiedEvent!.reviews.length - this.slidesPerView + 1);
    clearInterval(this.intervalId);
    this.startInterval();
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex + this.modifiedEvent!.reviews.length - this.slidesPerView) % (this.modifiedEvent!.reviews.length - this.slidesPerView + 1);
    clearInterval(this.intervalId);
    this.startInterval();
  }  

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
