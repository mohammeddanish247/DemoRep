import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, MenuController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IProducts } from './interface/products';
import { ApiService } from './services/api.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Location } from '@angular/common';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { Camera, CameraResultType , CameraSource } from '@capacitor/camera';
import { IUserData } from './interface/user-login';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  @ViewChild('title') title:ElementRef;
  @ViewChild('email') email:ElementRef;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  @ViewChild('child') private child: DashboardPage;

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  pages = [

    {
      name: "Dashboard",
      path: "dashboard",
      icon: "apps-outline"
    },
    {
      name: "My 24|7 Account",
      path: "profile",
      icon: "person-outline"
    },
    {
      name: "My Documents",
      path: "documents",
      icon: "document-outline",
    },
    {
      name: "Log a claim",
      path: "log-claim",
      icon: "newspaper-outline",
      productValue: null
    },
    {
      name: "Track my claims",
      path: "track-claim",
      icon: "analytics-outline",
      productValue: null
    },
    {
      name: "Contact Us",
      path: "contact",
      icon: "send-outline",
    },
    {
      name: "24x7 Support",
      path: "support",
      icon: "headset-outline",
    },
    {
      name: "Terms & Conditions",
      path: "terms-and-conditions",
      icon: "document-text-outline",
    },

    // {
    //   name: "Card",
    //   path: "cardds",
    //   icon: "document-text-outline",
    // },
  ];
  
  flag = true;
  imageUrl: string;

  constructor(
    public platform : Platform,
    public router : Router,
    public menuCtrl : MenuController,
    public api : ApiService,
    public storage : Storage,
    private alert : AlertController,
    public network : Network,
    private location : Location
    ) {
      this.initializeApp();
    }

  async ngOnInit() {
    await this.storage.create();
    this.storage.get('user_image').then(res=>this.imageUrl=res);
  }

  initializeApp() {
    console.log("Inbside inisiallized apps");
  //  this.network.onDisconnect().subscribe(() => {
  //     console.log('network was disconnected :-(');
  //     this.router.navigate(['no-internet']);
  //   });
    this.platform.backButton.subscribeWithPriority(0, () => {
      // console.log("Danish"+ this.router.url);
      if(this.router.url != '/no-internet'){
        // this.router.navigate(['dashboard']);
        this.location.back();
      }else{
        
      }
    });
  }

  navToPage(p){
    console.log(`navigating to ${p.path}`);
    if(p.path == "log-claim" || p.path == "track-claim"){
      this.router.navigate([`risk-addresses`],{
        state : p
      });
    }else{
      if(p.path == "terms-and-conditions"){
        document.getElementById("terms").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        }else{
          this.router.navigate([`${p.path}`],{
            state : p
          });
        }
      }
  }


  ionWillOpen(){
      this.storage.get("Userdata").then((res:any)=>{
        console.log(res);
        if (res != null) {                
          this.title.nativeElement.innerText = this.camelize(res.UserName.toLowerCase());
          // this.email.nativeElement.innerText = this.userData.Email.toLowerCase();
        }
      }).catch(err=>{
        console.log("error :"+err);
      })
  }

  ionWillClose(){
    
  }

camelize(str) {
  let name: string= "";
  str = str.split(" ");
  console.log(str.length);
  str.forEach(element => {
    name = name + " "+element.charAt(0).toUpperCase()+element.slice(1)
    console.log(name);
  });
  return name;
}

async logout(){
  this.menuCtrl.close();
  let alert = await this.alert.create({
    // message : "Do You want to log out",
    message : `<img src="../../../assets/imgs/logout.gif"><br>`,
    header : "Are You Sure?",
    subHeader: "Do you want to exit?",
    buttons: [{text : "Cancel"} , {text : "LogOut", handler : ()=>{
        this.api.logout();
    }}],

  });
  alert.present();
}

addphoto = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source : CameraSource.Prompt
    });
    this.imageUrl = image.dataUrl;
    this.storage.set('user_image',this.imageUrl);
}

onImgError(event){
  console.log(event);
  event.target.src = '../../../assets/imgs/profile.png';
}

}

