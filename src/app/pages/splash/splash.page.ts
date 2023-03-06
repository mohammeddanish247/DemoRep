import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { NavController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { splashAnimation } from 'src/app/animation/splash-animation';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit, ViewDidEnter, ViewWillEnter {

  constructor(public router : Router, private navCtrl : NavController) { 

  }

  ionViewWillEnter(): void {
  }

  ngOnInit() {
    SplashScreen.hide();
    setTimeout(() => {
      StatusBar.setBackgroundColor({ color : '#c21d22'});
    }, 100);
  }

  ionViewDidEnter() {
    setTimeout(() => {
      StatusBar.setBackgroundColor({ color : '#c21d22'});
    }, 200);
    setTimeout(() => {
      console.log('just login');
      this.router.navigate(['login'],{replaceUrl : true});
    }, 6000);
  }

}
