import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-track-claim',
  templateUrl: './track-claim.page.html',
  styleUrls: ['./track-claim.page.scss'],
})
export class TrackClaimPage implements OnInit {

  itemArray : any[];
  productData: any;
  completed: any = [];
  incomplete: any = [];
  claimslist: any = [];

  constructor(private router: Router, private auth: ApiService) {
    this.productData = this.router.getCurrentNavigation().extras.state ;    
    this.deferred();
   }

  ngOnInit() {
    console.log("inside track-calim page");
    console.log(this.completed.length);
  }

  async deferred() {
    try {
      let data: any = await this.auth.getClaimsbyCRef(this.productData.cref);
      console.log(data);
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].ClaimStatus == "Claim Declined" ||
            data[i].ClaimStatus == "Service Declined" ||
            data[i].ClaimStatus == "Job Complete"
          )
            this.completed.push(data[i]);
          else this.incomplete.push(data[i]);
        }
        this.claimslist = data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  navToPage(Claim: any) {
    this.router.navigate(['track-claim-details'], {
      state : {
        claim: Claim,
        pageData : this.productData
      }
    });
  }

}
