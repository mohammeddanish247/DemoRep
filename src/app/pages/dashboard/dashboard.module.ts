import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { SwiperModule } from 'swiper/angular';
import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    SharedDirectivesModule,
    SwiperModule
  ],
  declarations: [DashboardPage, TermsAndConditionsPage]
})
export class DashboardPageModule {}
