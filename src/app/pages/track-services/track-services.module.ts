import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackServicesPageRoutingModule } from './track-services-routing.module';

import { TrackServicesPage } from './track-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackServicesPageRoutingModule
  ],
  declarations: [TrackServicesPage]
})
export class TrackServicesPageModule {}
