import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { FadeHeaderDirective } from './fade-header.directive';
import { FadeImageDirective } from './fade-image.directive';
import { ParallaxDirective } from './parallax.directive';



@NgModule({
  declarations: [
    HideHeaderDirective,
    FadeHeaderDirective,
    FadeImageDirective,
    ParallaxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HideHeaderDirective,
    FadeHeaderDirective,
    FadeImageDirective,
    ParallaxDirective
  ]
})
export class SharedDirectivesModule { }
