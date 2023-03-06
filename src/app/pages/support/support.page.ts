import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  productData: any;

  constructor(private router : Router, private iab : InAppBrowser) {
    this.productData =  this.router.getCurrentNavigation().extras.state;
    console.log(this.productData);
    
   }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    StatusBar.setStyle({style : Style.Dark}); 
  }

  onClickCallUs(){
    window.open('tel:03450774177');
  }

  onClickCallUs2(){
    window.open('tel:03453192247');
  }

  onClickCallUs3(){
    window.open('mailto:enquiries@247homerescue.co.uk?Subject=Mobile%20Application%20Contact');
  }

  onClickCallUs4(){
    this.router.navigate(['contact'],{
      state : this.productData
    })
  }

  onClickCallUs5(){
    this.iab.create('https://247homerescue.co.uk/contact-us/','_self',{
      hideurlbar : 'yes',
      zoom : 'yes',
      fullscreen :'yes',
      toolbarcolor : '#dd2127',
    });
    // this.router.navigate(['payment'])
  }
}
