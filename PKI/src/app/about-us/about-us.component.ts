import { Component, EventEmitter, Output } from '@angular/core';
import { OrganizatorService } from '../services/organizator.service';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  @Output() close = new EventEmitter<void>();
  description = '';

  constructor(private organizatorService: OrganizatorService) { }

  ngOnInit() {
    this.description = this.organizatorService.getAboutDescription();
  }

  closeAbout() {
    this.close.emit();
  }
}
