import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackServicesDetailsPageRoutingModule } from './track-services-details-routing.module';

import { TrackServicesDetailsPage } from './track-services-details.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackServicesDetailsPageRoutingModule,
    SharedDirectivesModule,
  ],
  declarations: [TrackServicesDetailsPage]
})
export class TrackServicesDetailsPageModule {}
