import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUserObj } from '../../Model/interface/login';

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
      routerLink: '/admin/dashboard',
    },
    {
      icon: 'bi-mortarboard-fill me-2',
      label: 'Students',
      routerLink: '/admin/student',
    },
    {
      icon: 'bi-book me-2',
      label: 'Batch',
      routerLink: '/admin/batch/0',
    },
    {
      icon: 'bi bi-person me-2',
      label: 'Teacher',
      routerLink: '/admin/dashboard',
    },
    {
      icon: 'bi bi-gear me-2',
      label: 'Setting',
      routerLink: '/admin/dashboard',
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
