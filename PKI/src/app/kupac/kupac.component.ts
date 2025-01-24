import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { HeaderKupacComponent } from "../header-kupac/header-kupac.component";

@Component({
  selector: 'app-kupac',
  imports: [RouterOutlet, HeaderKupacComponent],
  templateUrl: './kupac.component.html',
  styleUrl: './kupac.component.css'
})
export class KupacComponent {

}
