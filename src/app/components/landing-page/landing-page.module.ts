import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],  // Declare the component here
  imports: [CommonModule],
  exports: [LandingPageComponent]  // Export the component if it's needed outside this module
})
export class LandingPageModule { }
