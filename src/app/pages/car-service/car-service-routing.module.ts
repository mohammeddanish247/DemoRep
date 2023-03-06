import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarServicePage } from './car-service.page';

const routes: Routes = [
  {
    path: '',
    component: CarServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarServicePageRoutingModule {}
