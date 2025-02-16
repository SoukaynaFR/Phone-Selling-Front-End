import { Component , OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarOpen = true; 
  isLoggedIn: boolean = false;

  constructor(private UserService: UserService ,
    private router: Router,
    private authService: AuthService,  private eRef: ElementRef) {}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  logout() {
    localStorage.removeItem('token');
this.isLoggedIn = false;
this.router.navigateByUrl('/'); 
}  
}
