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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Change here
      password: ['', [Validators.required]],
    });
    
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Early exit if form is invalid
    }

    const loginPayload = {
      email: this.loginForm.value.email, // Change here
      password: this.loginForm.value.password,
    };
    

    this.authService.login(loginPayload).subscribe(
      (response: any) => {
        const token = response.token;
        localStorage.setItem('token', token); // Store the token in localStorage
        this.router.navigate(['']); // Redirect after login
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed', error);
      }
    );
  }
}
