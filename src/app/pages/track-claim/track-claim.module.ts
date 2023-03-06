import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackClaimPageRoutingModule } from './track-claim-routing.module';

import { TrackClaimPage } from './track-claim.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { CapPipe } from 'src/app/pipe/cap.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackClaimPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [TrackClaimPage, CapPipe]
})
export class TrackClaimPageModule {}
