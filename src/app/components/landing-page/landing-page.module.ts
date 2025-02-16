import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule } from '@angular/forms';
import { BestOffersModule  } from '../best-offers/best-offers.module'


@NgModule({
  declarations: [LandingPageComponent],  // Declare the component here
  imports: [CommonModule,FormsModule,BestOffersModule  ],
  exports: [LandingPageComponent]  // Export the component if it's needed outside this module
})
export class LandingPageModule { }
