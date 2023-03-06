import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogClaimPageRoutingModule } from './log-claim-routing.module';

import { LogClaimPage } from './log-claim.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { CapPipe } from 'src/app/pipe/cap.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogClaimPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [LogClaimPage, CapPipe]
})
export class LogClaimPageModule {}
