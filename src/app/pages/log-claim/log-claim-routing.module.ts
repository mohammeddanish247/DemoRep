import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogClaimPage } from './log-claim.page';

const routes: Routes = [
  {
    path: '',
    component: LogClaimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogClaimPageRoutingModule {}
