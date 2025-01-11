import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
constructor(private router: Router) { }

  ngOnInit() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}