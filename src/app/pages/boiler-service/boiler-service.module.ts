import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoilerServicePageRoutingModule } from './boiler-service-routing.module';

import { BoilerServicePage } from './boiler-service.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoilerServicePageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [BoilerServicePage]
})
export class BoilerServicePageModule {}
