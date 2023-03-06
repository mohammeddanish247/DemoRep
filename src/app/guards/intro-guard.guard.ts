import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroGuardGuard implements CanLoad {

  constructor(private router: Router, private storage: Storage){

  }

   canLoad(): Promise<boolean> {
   return this.storage.get('introKey').then((hasSeenIntro)=>{
      console.log("inside intro guard hasSeen intro "+hasSeenIntro);
      
      if (hasSeenIntro) {
        return true;
      } else {
        this.router.navigate(['/intro']);
        return false;
      }
    })

}
}
