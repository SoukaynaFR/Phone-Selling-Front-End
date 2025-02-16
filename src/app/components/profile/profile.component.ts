import { Component, OnInit, HostListener, ElementRef, OnDestroy  } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  private cartSubscription!: Subscription;
  user: { nom: string; prenom: string; email: string } | null = null;

  constructor(private UserService: UserService ,
    private router: Router,
    private authService: AuthService,  private eRef: ElementRef) {}

  ngOnInit(): void {
    this.UserService.getProfile().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    );
  }


    
  logout() {
        localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/'); 
  }  

}
