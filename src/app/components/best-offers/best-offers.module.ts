import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestOffersComponent } from './best-offers.component';


@NgModule({
  declarations: [BestOffersComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [BestOffersComponent],
})
export class BestOffersModule { }
