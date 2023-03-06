import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackServicesPage } from './track-services.page';

const routes: Routes = [
  {
    path: '',
    component: TrackServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackServicesPageRoutingModule {}
