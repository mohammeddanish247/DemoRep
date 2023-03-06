import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EligibilityFormPageRoutingModule } from './eligibility-form-routing.module';

import { EligibilityFormPage } from './eligibility-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EligibilityFormPageRoutingModule
  ],
  declarations: [EligibilityFormPage]
})
export class EligibilityFormPageModule {}
