import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private authService: AuthService, private http: HttpClient) {}

  register() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // Utilisation du service pour faire la requête POST
    this.http.post('http://localhost:8081/inscription', this.user, httpOptions).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        alert('Inscription réussie');
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription', error);
        alert('Erreur : ' + (error?.error?.message || error.message || 'Erreur inconnue'));
      },
    });
  }

}
