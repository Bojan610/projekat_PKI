import { Component, inject, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-homepage-org',
  imports: [],
  templateUrl: './homepage-org.component.html',
  styleUrl: './homepage-org.component.css'
})
export class HomepageOrgComponent {
  @Input({required: true}) userFromPath?: User;

}
