import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackServicesDetailsPage } from './track-services-details.page';

const routes: Routes = [
  {
    path: '',
    component: TrackServicesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackServicesDetailsPageRoutingModule {}
