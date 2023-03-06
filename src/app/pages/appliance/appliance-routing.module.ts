import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppliancePage } from './appliance.page';

const routes: Routes = [
  {
    path: '',
    component: AppliancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliancePageRoutingModule {}
