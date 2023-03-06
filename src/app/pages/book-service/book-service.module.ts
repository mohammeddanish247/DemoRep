import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookServicePageRoutingModule } from './book-service-routing.module';

import { BookServicePage } from './book-service.page';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BookServicePageRoutingModule,
    SharedDirectivesModule
  ],
  declarations: [BookServicePage]
})
export class BookServicePageModule {}
