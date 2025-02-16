import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user = {
    email: '',
    mdp: '',
    nom: '',
    prenom: '',
  };
message: any;
isSuccess: any;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}
  register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  
    this.http.post('http://localhost:8081/inscription', this.user, { responseType: 'text' }).subscribe(
      (response) => {
        console.log('Response:', response);
        alert('✅ Compte créé avec succès ! Un code d’activation a été envoyé à votre email.');

  
           // Redirection vers la page d'activation
           this.router.navigate(['/activation']);
      },
      (error) => {
        console.log(error);
        alert('❌ Erreur lors de la création du compte.');
      }
    );
  }
  
  

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
