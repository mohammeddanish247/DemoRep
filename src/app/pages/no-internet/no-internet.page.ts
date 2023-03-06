import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.page.html',
  styleUrls: ['./no-internet.page.scss'],
})
export class NoInternetPage implements OnInit {

  constructor(public network : Network,private location: Location) { 

  }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color : '#ffffff'});
    StatusBar.setStyle({style : Style.Light});
    let subscribtion = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    this.location.back();
    subscribtion.unsubscribe();
    });

  }


}
