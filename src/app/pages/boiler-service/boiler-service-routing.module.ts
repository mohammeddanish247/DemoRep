import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoilerServicePage } from './boiler-service.page';

const routes: Routes = [
  {
    path: '',
    component: BoilerServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoilerServicePageRoutingModule {}
