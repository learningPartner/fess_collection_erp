import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUserObj } from '../../Model/interface/login';
import { Constant } from '../../Constant/Constant';

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

  menuItems = Constant.menuItems;

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
