import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibilityFormPage } from './eligibility-form.page';

const routes: Routes = [
  {
    path: '',
    component: EligibilityFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EligibilityFormPageRoutingModule {}
