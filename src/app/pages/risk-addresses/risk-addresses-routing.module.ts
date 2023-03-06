import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskAddressesPage } from './risk-addresses.page';

const routes: Routes = [
  {
    path: '',
    component: RiskAddressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskAddressesPageRoutingModule {}
