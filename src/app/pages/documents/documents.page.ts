import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { IonSelect } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IDocument, IUserData } from 'src/app/interface/user-login';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  @ViewChild('dropdown') dropdown:ElementRef;

  productData: any = {
    img: "assets/imgs/boiler-card.png",
    name: "My Documents",
    path: "documents",
    // productValue: 1
  };
  skel : boolean = true;
  policiesData: any;
  currentDocLink: any;
  popertyAddresses= [];

  constructor(private router:Router,
    private auth : ApiService,
    private storage : Storage
    ) {

   }

   boilerBrekDownPolicy :IDocument[] = [
    {imgUrl : "/assets/imgs/products/CP12 Certificate.svg" , imgText : "Policy", currentLink :  "", renewalLink : ""},
    {imgUrl : "/assets/imgs/products/term&condition.svg" , imgText : "Terms & Conditions", currentLink :  "", renewalLink : ""},
    {imgUrl : "/assets/imgs/products/IPID.svg" , imgText : "IPID", currentLink :  "", renewalLink : ""},
    {imgUrl : "/assets/imgs/products/about us.svg" , imgText : "About Us", currentLink :  "", renewalLink : ""}
  ]

  serviceDocument : any[] = [
    {imgUrl : "/assets/imgs/products/CP12 Certificate.svg" , imgText : "2020"},
    {imgUrl : "/assets/imgs/products/CP12 Certificate.svg" , imgText : "2021"}
  ]
  ngOnInit() {
    this.skel = true ;
    console.log("Dasnish "+this.dropdown);
    console.log("inside Document page");    
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    console.log(this.productData);
    this.storage.get('Userdata').then((res: IUserData)=>{
      this.auth.getLivePolicies(res.LeadID).subscribe(policyData=>{
        this.policiesData = policyData;
        for (let i = 0; i < this.policiesData.length; i++) {
          this.popertyAddresses.push(this.policiesData[i]);
        }
        console.log(this.policiesData);
        console.log(this.policiesData[0].LeadID);
        this.getDocumentLinks(this.policiesData[0].LeadID);

      })
    
    })
  }

  getDocumentLinks(lead : string) {
    this.auth.getDocumentsbyLead(lead).subscribe((res:any)=>{
      this.currentDocLink = res;
      console.log(res);
      
      this.boilerBrekDownPolicy[0].currentLink = res.CurrentPolicyDocuments.PolicyDocumentLink;
      this.boilerBrekDownPolicy[1].currentLink = res.CurrentPolicyDocuments.TOCDocumentLink;
      this.boilerBrekDownPolicy[2].currentLink = res.CurrentPolicyDocuments.IPIDDocumentLink;
      this.boilerBrekDownPolicy[3].currentLink = res.CurrentPolicyDocuments.AboutUsDocumentLink;

      this.boilerBrekDownPolicy[0].renewalLink = res.RenewalPolicyDocuments.PolicyDocumentLink;
      this.boilerBrekDownPolicy[1].renewalLink = res.RenewalPolicyDocuments.TOCDocumentLink;
      this.boilerBrekDownPolicy[2].renewalLink = res.RenewalPolicyDocuments.IPIDDocumentLink;
      this.boilerBrekDownPolicy[3].renewalLink = res.RenewalPolicyDocuments.AboutUsDocumentLink;


      this.skel = false;
    })
  }

  dropdownClicked(event){
    console.log(event);
    
    this.skel = true;
    const leadId = event.target.value
    this.getDocumentLinks(leadId);
  }

}
