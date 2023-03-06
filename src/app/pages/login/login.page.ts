import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionStatus } from '@capacitor/network';
import { StatusBar, Style } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IUserCredential, IUserData } from 'src/app/interface/user-login';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  surname : string = "";
  cref : string = "";
  data: any;
  network: ConnectionStatus;
  Userdata: IUserData;

  @Output() eventEmit = new EventEmitter<string>();

  constructor(
    private router : Router,
    private api : ApiService,
    private navCtrl : NavController,
    private render: Renderer2,
    private storage : Storage
    ) { }

    

  ngOnInit() {
    // StatusBar.setOverlaysWebView({ overlay : false});
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    StatusBar.setStyle({style : Style.Dark});
    StatusBar.show();
  }

  // toHome(){
  //   this.router.navigate(['home']);
  // }

  onLogin(event :any){
    this.render.addClass(event.srcElement,'active');//loading animation
    console.log(this.surname, this.cref);
    this.api.loginAuthentication(this.cref,this.surname).subscribe(
    (isloggedIn)=>{
        this.onSuccess(event);//loading animation
    },(err)=>{
      setTimeout(() => {
        this.render.removeClass(event.srcElement,'active');//loading animation removed
        if (err == 'Login Access Denied!') {
          this.api.showAlertBox(`<img src="../../../assets/imgs/cross.gif"><br>You do not have permission to login. Please check your credential and try again.`,`Access Denied !`);
        } else {
          this.api.showAlertBox(`<img src="../../../assets/imgs/cross.gif"><br>${err.statusText} ${err.error} `,`${err.status+" "+err.name}`) //${err.message}    
        }        
      }, 500);
    },()=>{
      console.log('Authentication Complete');      
    })
  }
  
  onSuccess(event : any) {
    setTimeout(() => {
      this.render.addClass(event.srcElement,'success');
      setTimeout(() => {
        this.router.navigate(['dashboard'],{replaceUrl:true}).then(()=>{
          let credential : IUserCredential = {
            Cref : this.cref,
            LastName : this.surname
          }
          this.storage.set('credential',credential).then(()=>{
            this.surname = "";
            this.cref = "";
          })
          setTimeout(() => {
            this.render.removeClass(event.srcElement,'success');//loading animation removed
            this.render.removeClass(event.srcElement,'active');//loading animation removed
          }, 1000);
        })
      }, 1000);
    }, 500);
  }
}
