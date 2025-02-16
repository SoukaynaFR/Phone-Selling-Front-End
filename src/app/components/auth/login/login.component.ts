import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoggedIn!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      mdp: ['', [Validators.required]],
    });
  }

  login() {

    if (this.loginForm.invalid) {
      console.error('Formulaire invalide', this.loginForm.errors);
      return;
    }

    const loginPayload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.mdp,  
    };

    console.log('Données envoyées au backend:', loginPayload);

    this.authService.login(loginPayload).subscribe(
      (response: any) => {
        console.log('Réponse de l\'API:', response);
        if (response && response.bearer) {
          localStorage.setItem('token', response.bearer);
          this.router.navigate(['']);
        } else {
          this.errorMessage = 'Aucun token reçu.';
          console.error('Erreur: Aucun token dans la réponse', response);
        }
      },
      (error) => {
        this.errorMessage = 'Échec de la connexion. Vérifiez vos identifiants.';
        console.error('Erreur API:', error);
      }
    );
    
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}