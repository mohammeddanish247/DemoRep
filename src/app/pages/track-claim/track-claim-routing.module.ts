import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackClaimPage } from './track-claim.page';

const routes: Routes = [
  {
    path: '',
    component: TrackClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackClaimPageRoutingModule {}
