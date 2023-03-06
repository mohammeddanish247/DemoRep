import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Stripe, StripeCardTokenParams } from '@awesome-cordova-plugins/stripe/ngx';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  encapsulation : ViewEncapsulation.None
})
export class PaymentPage implements OnInit {

  storeData: any;
  iban_no: any;
  isModalOpen = false;
  date : Date | undefined ;
  ammount : any;
  currentYears = Array.from({length: 6}, (v, i) => i + (new Date()).getFullYear());

  cardNum = "123456789456123"
  access_value :number = 59;
  productData : any;
  form = new FormGroup({
    // email: new FormControl('',[Validators.email , Validators.required]),
    cardNumber: new FormControl('',[Validators.required, Validators.maxLength(19)]),
    expMonth: new FormControl('',Validators.required),
    expYear: new FormControl('',Validators.required),
    cvv: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    address1: new FormControl(''),
    address2: new FormControl(''),
  })


  constructor( private stripe : Stripe, private auth : ApiService, private modalCtrl : ModalController) {
  }

  ngOnInit(): void {
    // this.productData = {
    //   name : "Payment",
    //   path : `Pay £${this.access_value}`
    // };
  }

  cardinput(event){
    console.log(event);
  }

  
  payClick(){
    console.log(this.form.value);
    this.auth.presentLoading("Please wait while we are processing your Transaction...")
    // let cardDetails : StripeCardTokenParams;
    // cardDetails.email = this.form.value.email;
    // cardDetails.number = this.form.value.cardNumber.trim();
    // cardDetails.cvc = this.form.value.cvv.trim();
    // cardDetails.expMonth = parseInt(this.form.value.expMonth);
    // cardDetails.expYear = parseInt(this.form.value.expYear);
    // cardDetails.name = this.form.value.name;
    // cardDetails.currency = 'GBP'
    var card = {
      number: this.form.value.cardNumber.toString().replace(/\s/g, ""), // 16-digit credit card number
      expMonth: parseInt(this.form.value.expMonth), // expiry month
      expYear: parseInt(this.form.value.expYear), // expiry year
      cvc: this.form.value.cvv.toString().replace(/\s/g, ""), // CVC / CCV
      name: this.form.value.name, // card holder name (optional)
      currency: 'GBP' // Three-letter ISO currency code (optional)
    };
    console.log("Danish "+JSON.stringify(card));
    this.stripe.setPublishableKey('pk_test_ksIACtF9tWOCSWNRpkgm1y6E');
    this.stripe.createCardToken(card)
    .then(token => {
      if(token){
        console.log(token.id)
        this.modalCtrl.dismiss({
          stripeToken : token.id
        });
      }else{
        this.auth.showAlertBoxWithAnimation("Error Occured","alert","Token not found. Please contact the support team for further assistance.")
      }
      })
    .catch(error => {
      this.auth.dismissLoading();
      this.auth.showAlertBoxWithAnimation("Invalid Details","alert",error)
    });

    // console.log(this.form.get('email'));
    // this.payDetailsArray.push({email : this.form.value.email , CardNumber : this.form.value.cardNumber , exDate: this.form.value.exDate , cvv:this.form.value.cvv , name:this.form.value.name});
    // console.log("### payDetailsArray data"+JSON.stringify(this.payDetailsArray));
  
  }


  // get Email() : FormControl{
  //   return this.form.get('email') as FormControl;
  // }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
 
  }

  get cardNo() : FormControl{
    return this.form.get('cardNumber') as FormControl;
  }

  get expMonth() : FormControl{
    return this.form.get('expMonth') as FormControl;
  }

  get expYear() : FormControl{
    return this.form.get('expYear') as FormControl;
  }

  get Cvv() : FormControl{
    return this.form.get('cvv') as FormControl;
  }

  press(open:boolean){
    console.log("clicked");
    this.isModalOpen = open;
    
  }


}
