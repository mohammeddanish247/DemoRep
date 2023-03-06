import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackClaimDetailsPageRoutingModule } from './track-claim-details-routing.module';

import { TrackClaimDetailsPage } from './track-claim-details.page';
import { CapPipe } from 'src/app/pipe/cap.pipe';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackClaimDetailsPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [TrackClaimDetailsPage, CapPipe]
})
export class TrackClaimDetailsPageModule {}
