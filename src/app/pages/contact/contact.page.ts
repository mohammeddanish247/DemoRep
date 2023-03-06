import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import "@lottiefiles/lottie-player";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  toggle: boolean = false;
  productData: any;



  constructor(private router : Router) {
    this.productData =  this.router.getCurrentNavigation().extras.state;
    console.log(this.productData);
   }

  
  ngOnInit() {
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    StatusBar.setStyle({style : Style.Dark}); 
  }

  toggleButton(){
    this.toggle = !this.toggle
  }

  sendMessage(){
    console.log("implement send email from here");
  }
}
