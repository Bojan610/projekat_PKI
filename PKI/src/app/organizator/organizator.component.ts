import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-organizator',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './organizator.component.html',
  styleUrl: './organizator.component.css'
})
export class OrganizatorComponent {

}
