import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeEmergencyPageRoutingModule } from './home-emergency-routing.module';

import { HomeEmergencyPage } from './home-emergency.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEmergencyPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [HomeEmergencyPage]
})
export class HomeEmergencyPageModule {}
