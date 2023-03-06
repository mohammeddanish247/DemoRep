import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEmergencyPage } from './home-emergency.page';

const routes: Routes = [
  {
    path: '',
    component: HomeEmergencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEmergencyPageRoutingModule {}
