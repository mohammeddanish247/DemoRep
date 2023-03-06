import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {
  productData: any;
  productslist: any = [];
  noDataFound: boolean;

  constructor(private router: Router, private auth: ApiService) {
    this.productData = this.router.getCurrentNavigation().extras.state ;
    console.log(this.productData);
    this.deferred();
   }

  ngOnInit() {
    console.log("inside product list page");
    
  }

  async deferred() {
    let data: any = await this.auth.getProductsList(this.productData.leadID, this.productData.productValue);
    if (data.length) {
      this.productslist = data;
      console.log('get product list');
      console.log(this.productslist);
    }else{
      this.noDataFound = true;
    }
  }

  navToPage(page) {
    this.router.navigate(['product'],{
      state : {
        data : this.productData,
        productlist : page
      }
    });    
  }

  onImgError(event){
    console.log(event);
    event.target.src = '../../../assets/imgs/home-round-icon.svg';
  }

}
