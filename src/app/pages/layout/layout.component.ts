import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUserObj } from '../../Model/login';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isSidebarCollapsed = signal<boolean>(true);
  sidebarVisible: boolean = true;

  router = inject(Router);

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

  loginObj: IUserObj = {
    username: '',
    password: '',
  };

  onLogout() {
    this.loginObj.username = '';
    this.loginObj.password = '';
    this.router.navigateByUrl('/login');
  }
}
