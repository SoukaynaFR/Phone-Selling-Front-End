import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent {
  code: string = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(private http: HttpClient) {}

  activateAccount() {
    const payload = { code: this.code };

    this.http.post('http://localhost:8081/activation', payload, { responseType: 'text' }).subscribe(
      (response) => {
        console.log(response);
        this.message = '✅ Votre compte a été activé avec succès ! Vous pouvez vous connecter à votre compte';
        this.isSuccess = true;

        // Rediriger vers la page de connexion après quelques secondes
        setTimeout(() => {
          window.location.href = '/login'; 
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.message = '❌ Code invalide ou expiré.';
        this.isSuccess = false;
      }
    );
  }
}
