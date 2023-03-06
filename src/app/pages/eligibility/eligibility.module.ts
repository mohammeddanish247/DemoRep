import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EligibilityPageRoutingModule } from './eligibility-routing.module';

import { EligibilityPage } from './eligibility.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EligibilityPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [EligibilityPage]
})
export class EligibilityPageModule {}
