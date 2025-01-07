import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isSidebarCollapsed = signal<boolean>(true);

  toggleSidebar() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed())
  }
}
