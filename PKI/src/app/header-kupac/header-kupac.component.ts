import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { OrganizatorService } from '../services/organizator.service';
import { Notification } from '../models/notification.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header-kupac',
  imports: [RouterLinkActive, RouterLink, NgFor, NgIf],
  templateUrl: './header-kupac.component.html',
  styleUrl: './header-kupac.component.css'
})
export class HeaderKupacComponent {
  selected: boolean = false;
  notificationsOpenClose = false;
  notifications: Notification[] = [];
  unreadNotifications: Notification[] = [];

  constructor(private organizatorService: OrganizatorService) {}

  ngOnInit() {
    this.notifications =  this.organizatorService.getNotofications();
    this.unreadNotifications = this.notifications.filter(item => item.read === false);
  }

  onClick() {
    this.selected = !this.selected;
  }

  openCloseNotifications() {
    this.notificationsOpenClose = !this.notificationsOpenClose;
  }

  read(notification: Notification) {
    if (!notification.read) {
      notification.read = true;
      this.unreadNotifications = this.notifications.filter(item => item.read === false);
    }
  }
}
