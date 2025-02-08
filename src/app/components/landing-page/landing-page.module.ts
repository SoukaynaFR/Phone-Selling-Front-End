import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingPageComponent],  // Declare the component here
  imports: [CommonModule,FormsModule  ],
  exports: [LandingPageComponent]  // Export the component if it's needed outside this module
})
export class LandingPageModule { }
