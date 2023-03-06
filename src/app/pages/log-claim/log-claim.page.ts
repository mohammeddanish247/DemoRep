import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserData } from 'src/app/interface/user-login';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-log-claim',
  templateUrl: './log-claim.page.html',
  styleUrls: ['./log-claim.page.scss'],
})
export class LogClaimPage implements OnInit {

  services : any;
  productData: any;
  
  constructor(private router: Router,
    private api: ApiService
    ) { 
      this.productData = this.router.getCurrentNavigation().extras.state ;    
      console.log(this.productData);
      this.deferred();
    }

  ngOnInit() {
    console.log("inside log-claim page");
    // this.api.getUserData().then((data :IUserData)=>{
    //   console.log(data);
    //   this.data = data
    //   this.deferred();
    // })
    
  }

  async deferred() {
    let a:any = await this.api.getProducts(this.productData.cref,this.productData.leadID).catch(err=>{
      alert(err.error);
    })
    console.log(a);
    this.services = a;
  }


  navToClaim(p) {
    this.router.navigate(['claim'],{
      state : {
        Hr360ProductID: p.Hr360ProductID,
        CRef: this.productData.cref,
      }
    });
  }

  onImgError(event){
    console.log(event);
    event.target.src = '../../../assets/imgs/products/default.svg';
  }
}
