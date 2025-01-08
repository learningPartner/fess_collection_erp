import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isSidebarCollapsed = signal<boolean>(true);
  sidebarVisible: boolean = true;

  menuItems = [
    {
      icon: 'bi-house me-2',
      label: 'Dashboard',
      routerLink: '/dashboard',
    },
    {
      icon: 'bi-mortarboard-fill me-2',
      label: 'Students',
      routerLink: '/student',
    },
    {
      icon: 'bi-book me-2',
      label: 'Batch',
      routerLink: '/dashboard',
    },
    {
      icon: 'bi bi-person me-2',
      label: 'Teacher',
      routerLink: '/dashboard',
    },
    {
      icon: 'bi bi-gear me-2',
      label: 'Setting',
      routerLink: '/dashboard',
    },
  ];

  toggleSidebar() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }
}
