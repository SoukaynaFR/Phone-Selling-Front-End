import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarOpen = true; // Start open or closed as desired
  private router: any;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout() {
    // Perform logout logic (clear localStorage/sessionStorage, etc.)
    localStorage.clear();

    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
