import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-homepage-kupac',
  imports: [],
  templateUrl: './homepage-kupac.component.html',
  styleUrl: './homepage-kupac.component.css'
})
export class HomepageKupacComponent {
  @Input({required: true}) userFromPath?: User;
}
