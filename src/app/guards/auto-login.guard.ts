import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { filter, map, take } from 'rxjs/operators';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { NavController } from '@ionic/angular';
import { splashAnimation } from '../animation/splash-animation';
import { StatusBar } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(private authService: ApiService, private router: Router, private network: Network, private navCtrl : NavController) {
    console.log("Danish inside Auto Login Guard");
    // StatusBar.setOverlaysWebView({ overlay : false});
    this.authService.loadToken();
   }
 
  canLoad(): Observable<boolean> {    
    console.log(this.authService.isAuthenticated.pipe(
      filter(val => val !== null)));
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        console.log('inside automatic login guard value ' +isAuthenticated);
        if (isAuthenticated) {
          // Directly open inside area       
          console.log('value is true that is why showing dashboard page');
          this.router.navigate(['dashboard'],{
            replaceUrl : true
          })
          // this.navCtrl.navigateForward(['dashboard'],{
          //   animation : splashAnimation
          // })
        } else {          
          // Simply allow access to the login
          console.log('value is false that is why showing login page');
          return true;
        }

      })
    );
  }
}
