import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-eligibility',
  templateUrl: './eligibility.page.html',
  styleUrls: ['./eligibility.page.scss'],
})
export class EligibilityPage implements OnInit {
  productData: any;
  productslist = [];
  noDataFound : boolean = false;

  constructor(private router:Router,
    private auth : ApiService) {
    this.productData =  this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit() {
    console.log("inside Eligibity page");    
    console.log(this.productData);
    this.getEligibility();
  }


  getEligibility() {
    this.auth.getEligibilityProducts(this.productData.cref,this.productData.leadID).then((res:any)=>{
      console.log(res);
      if(res.length){
        for (let i = 0; i < res.length; i++) {
          this.productslist.push(res[i])
        }
      }else{
        this.noDataFound = true
      }
    })
  }

  navToPage(singleproduct: any){
    singleproduct.cref = this.productData.cref;
    this.router.navigate(['eligibility-form'],{
      state : singleproduct
    })
  }

  onClickCallUs(){
    window.open('tel:03450774177');
  }


}
