import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimPageRoutingModule } from './claim-routing.module';

import { ClaimPage } from './claim.page';
import { SpacePipe } from 'src/app/pipe/space.pipe';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClaimPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [ClaimPage, SpacePipe]
})
export class ClaimPageModule {}
