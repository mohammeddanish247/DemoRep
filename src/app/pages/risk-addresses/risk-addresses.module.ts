import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RiskAddressesPageRoutingModule } from './risk-addresses-routing.module';
import { RiskAddressesPage } from './risk-addresses.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { CapPipe } from 'src/app/pipe/cap.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskAddressesPageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [RiskAddressesPage, CapPipe]
})
export class RiskAddressesPageModule {}
