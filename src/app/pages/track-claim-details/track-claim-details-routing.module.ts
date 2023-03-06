import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackClaimDetailsPage } from './track-claim-details.page';

const routes: Routes = [
  {
    path: '',
    component: TrackClaimDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackClaimDetailsPageRoutingModule {}
