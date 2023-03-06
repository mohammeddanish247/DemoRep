import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibilityPage } from './eligibility.page';

const routes: Routes = [
  {
    path: '',
    component: EligibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EligibilityPageRoutingModule {}
