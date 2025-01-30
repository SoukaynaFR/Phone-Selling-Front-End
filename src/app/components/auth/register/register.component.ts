import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; // Assurez-vous que ce service existe
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message: string = '';
  loading: boolean = false;  // Loading state for form submission

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;  // Add a loading state
      this.message = '';  // Clear any previous messages
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.message = 'Inscription réussie ! Redirection...';
          setTimeout(() => {
            this.router.navigate(['/']);
            this.registerForm.reset();  // Reset form after success
          }, 2000);
        },
        error: (err) => {
          this.message = `Erreur lors de l’inscription : ${err?.error?.message || 'Une erreur inconnue est survenue'}`;
          console.error('Registration error', err);  // Log error for debugging
        },
        complete: () => {
          this.loading = false;  // Hide loading state when the request completes
        }
      });
    } else {
      this.message = 'Veuillez remplir tous les champs du formulaire correctement.';
    }
  }
  
}