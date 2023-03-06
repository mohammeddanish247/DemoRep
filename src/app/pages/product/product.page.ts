import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  productData: any;
  hasService: any ;
  ProductID: any;
  Hr360ProductID: string = null;
  hasServiceFlag: boolean = false;
  productlist: any;

  constructor(private router: Router,
    private auth: ApiService) { 
      console.log("inside products page");
  }

  ngOnInit() {
    this.productData = this.router.getCurrentNavigation().extras.state.data;
    this.productlist = this.router.getCurrentNavigation().extras.state.productlist;
    this.ProductID = this.productlist.ProductID
    this.deferred();    
  }

  async deferred() {
    console.log(this.ProductID);
    let hasService: any = await this.auth.hasService(this.ProductID);
    console.log('this.hasService: '+hasService+" "+hasService.length);
    this.hasServiceFlag = true;
    if (hasService.Value) {
      this.hasService = hasService.Value;
    }
    if (hasService.Hr360ProductID) {
      this.Hr360ProductID = hasService.Hr360ProductID;
      
    }
  }  

  navToSC() {
    console.log("nav to sc clicked");
    this.auth.viewUserServiceContract();
  }

  navToClaim() {
    this.router.navigate(['claim'],{
      state : {
        Hr360ProductID: this.Hr360ProductID,
        CRef: this.productData.cref,
      }
    });
  }

  async bookaservice() {
    console.log(this.productData.cref);
      this.auth.checkifETAorFutureService(this.productData.cref).then(claimid=>{
       this.auth.checkInceptionDateandServiceDueDate(this.productData.cref).then((inceptionmessage:any)=>{
        if (inceptionmessage.CodeMessage === "InceptionDateLess8Months") {
          // this.util.showAlert(
          //   "Book a Service",
          //   "Please can you call <br><a href='tel:03453192247'>0345 3192 247</a>(Option 2) <br> Quote: My First Service",
          //   () => {},
          // );
        } else if (inceptionmessage.CodeMessage === "1") {
          // this.util.showAlert(
          //   "Book a Service",
          //   "Service Due Date less than 2 months.",
          //   () => {},
          // );
        } else {
          this.router.navigate(['service']);
          // this.navCtrl.push(ServicePage, {
          //   claimid: claimid,
          //   postcode: inceptionmessage.ContactPostcode,
          //   address: inceptionmessage.ContactAddress,
          //   name: inceptionmessage.ContactName,
          //   phone1: inceptionmessage.ContactPhone1,
          //   phone2: inceptionmessage.ContactPhone2,
          // });
        }
       }).catch(err=>{

       })

      }).catch(err=>{
        // show alert box
      });
      // console.log(inceptionmessage);
  } 

  openUpgrage(){
    window.open('https://www.247homerescue.co.uk/boiler-cover/','_system');
  }

}
