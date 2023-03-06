import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { ApiService } from './services/api.service';
import { LottiePlayer } from '@lottiefiles/lottie-player';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapPipe } from './pipe/cap.pipe';
import { enterAnimation } from './animation/nav-animation';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';


@NgModule({
  declarations: [AppComponent, CapPipe],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot({
      navAnimation : enterAnimation,
    }),
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    Storage,
    LottiePlayer,
    InAppBrowser,
    YoutubeVideoPlayer,
    Network,
    Stripe,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
