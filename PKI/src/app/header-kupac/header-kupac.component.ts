import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-kupac',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header-kupac.component.html',
  styleUrl: './header-kupac.component.css'
})
export class HeaderKupacComponent {
  selected: boolean = false;

  onClick() {
    this.selected = !this.selected;
  }
}
