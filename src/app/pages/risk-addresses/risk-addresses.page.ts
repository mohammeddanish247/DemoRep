import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-risk-addresses',
  templateUrl: './risk-addresses.page.html',
  styleUrls: ['./risk-addresses.page.scss'],
})
export class RiskAddressesPage implements OnInit {
  productData: any;
  riskAddresses: any = [];
  noDataFound: boolean = false;

  constructor(private router:Router, private auth : ApiService) {
    this.productData =  this.router.getCurrentNavigation().extras.state;
    console.log(this.productData);
   }

  ngOnInit() {
    console.log("in RiskAddress page");   
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    StatusBar.setStyle({style : Style.Dark}); 
    this.deferred();
    
  }

  async deferred() {
    let a = this.productData.path;
    if(a == 'track-claim' || a == 'log-claim' || a == 'eligibility'){
      let data: any = await this.auth.GetAllLivePoliciesByLead();
      console.log("Dasnishdihasidhiashd  "+data.length);
      if (data && data.length) {
        this.riskAddresses = data;
      } else {
        this.noDataFound = true;
      }
    }else{
      let data: any = await this.auth.getRiskAddresses(this.productData.productValue);
      console.log("Dasnishdihasidhiashd  "+data.length);
      if (data && data.length) {
        this.riskAddresses = data;
      } else {
        this.noDataFound = true;
      }
    }
    console.log("Length of /risk /adress "+this.riskAddresses.length);
  }



  navToPage(leadID: string, cref: string) {
    let a = this.productData.path;
    if(a == 'track-claim' || a == 'log-claim' || a == 'eligibility'){
      console.log("navigatin to "+a);
      this.router.navigate([`${a}`],{
        state : {
          leadID : leadID,
          cref : cref,
          productValue : this.productData.productValue,
          path : this.productData.path
        }
      });
    }else{
      this.router.navigate(['products-list'],{
        state : {
          leadID : leadID,
          cref : cref,
          productValue : this.productData.productValue,
          path : this.productData.path
        }
      });
    }
  }

  onClickCallUs(){
    window.open('tel:03450774177');
  }

  isEligibility(){

  }

  isclaimtrack(){

  }

  islogaclaim(){

  }
}
