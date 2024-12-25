import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  bestOffers = [
    {
      name: 'iPhone 13',
      description: 'Le dernier modèle d\'iPhone avec caméra améliorée.',
      price: 999,
      image: 'https://via.placeholder.com/250x150'
    },
    {
      name: 'Samsung Galaxy S21',
      description: 'Un smartphone rapide avec une batterie longue durée.',
      price: 799,
      image: 'https://via.placeholder.com/250x150'
    }
  ];

  products = [
    {
      name: 'Coque pour iPhone 13',
      description: 'Coque de protection en silicone.',
      price: 19.99,
      image: 'https://via.placeholder.com/250x150'
    },
    {
      name: 'Chargeur sans fil',
      description: 'Chargez votre téléphone sans câble.',
      price: 29.99,
      image: 'https://via.placeholder.com/250x150'
    }
  ];
}
