import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false
})
export class HeaderComponent {
  isMenuVisible = true;
  menuItems = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Reports', route: '/reports' },
    { name: 'Settings', route: '/settings' }
  ];
  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
