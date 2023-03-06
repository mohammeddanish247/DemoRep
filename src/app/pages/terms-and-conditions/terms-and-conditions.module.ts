import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TermsAndConditionsPageRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsPage } from './terms-and-conditions.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndConditionsPageRoutingModule,
    SwiperModule
  ],
  declarations: [TermsAndConditionsPage]
})
export class TermsAndConditionsPageModule {}
