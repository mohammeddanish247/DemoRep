import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonModal, IonContent, IonSlides, AlertController} from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPrecheck } from 'src/app/interface/IPrecheck';
import { PaymentPage } from '../payment/payment.page';
import { HttpParams } from '@angular/common/http';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';

interface ClaimResponse {
  Outcome;
  OutcomeExplanation;
  ExcessDueToAge;
  Message;
  PaymentReason;
  PaymentReasonExplanation;
  PaymentToBeCollected;
  DisbursmentID;
  ClaimStatus;
}

@Component({
  selector: 'app-claim',
  templateUrl: './claim.page.html',
  styleUrls: ['./claim.page.scss'],
})
export class ClaimPage implements OnInit {

  @ViewChild('option1',{static: true}) op1: ElementRef;
  @ViewChild('option2',{static: true}) op2: ElementRef;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;

  
  product: any;
  manufacturers: unknown;
  data : any;
  questions : any[] ;
  precheckQs : any[];
  qCount: number = 0;
  s: any;

  claimForm =new FormGroup({})

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;
  public isFinalEnd: boolean = false;

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };
  noQuestionFlag: boolean = false;
  precheckAnsArray: any[] = [];
  isprecheckDone: boolean = false;
  skeltonFlag: boolean = false;
  precheckSubmitedAns: string;
  isClaimSubmitted: boolean = false;
  access_value: any;
  access_reason: any;
  access_reason_explaination: any;
  isPaymentDone: boolean = false;
  stripeOutcome: any;
  isPaymentFailed: boolean = false;
  SubmittedClaimResponece: string;
  claimId: any;
  isModalOpen: boolean = false;
  stripetoken: string;
  currentYears = Array.from({length: 6}, (v, i) => i + (new Date()).getFullYear());

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



  constructor(private router:Router,
     private alert : AlertController,
     private auth: ApiService,
     public formBuilder: FormBuilder,
     public modalCtrl: ModalController, 
     private iab : InAppBrowser,
     private rendere: Renderer2, 
     private stripe : Stripe,
     private el:ElementRef) {

      this.product = this.router.getCurrentNavigation().extras.state;
      console.log(this.product);
      }

  ngOnInit() {
    console.log("inside claim page");
    this.getdata();
  }

  // Do You Realy want to make a Claim
  // Can We Fix it Before we make a Claim
  // Can we Fix it togather.
  
  getdata() {
    this.auth.getManufacturers().then(
      res => {
        this.manufacturers = res;
        console.log(res);
        this.auth.getProductsQs(this.product.Hr360ProductID).then(res=>{
          console.log(res);
          this.data = res
          this.skeltonFlag = true;
          this.showQuestions();
        }, reject => {
          console.log(reject);
        });
      },
      reject => {
        console.log(reject);
      });
  }

  showQuestions() {
    if (this.data.HasPrecheckQuestion && this.data.PrecheckQuestions.length) {
      this.questions = this.data.PrecheckQuestions;
      console.log(this.questions);
      this.s = this.questions[this.qCount];
      this.questions.forEach(element => {
        this.claimForm.addControl(element.ID,new FormControl("",Validators.required))
      });
    }else if(this.data.Questions && this.data.Questions.length){
      this.questions = this.data.Questions;
      console.log(this.questions);
      this.s = this.questions[this.qCount];
      this.questions.forEach(element => {
        this.claimForm.addControl(element.ID,new FormControl("",Validators.required))
      });
    }else{
      this.noQuestionFlag = true;
    }
  }

onNextButtonTouched(){
    if (this.claimForm.get(""+this.s.ID).invalid) {
      this.auth.showAlertBoxWithAnimation("Alert !","alert","Please provide appropriate answer.");
    } else {
      ++this.qCount;
      this.s = this.questions[this.qCount];
      document.getElementById('bubble').classList.remove("animate__bounceIn");
      setTimeout(()=>{
      document.getElementById('bubble').classList.add("animate__bounceIn");
      },0)
      this.ionSlides.slideNext();
      console.log("dddd "+JSON.stringify(this.claimForm.invalid)); 
    }
}

onBackButtonTouched(){
  --this.qCount;
  this.s = this.questions[this.qCount];
  document.getElementById('bubble').classList.remove("animate__bounceIn");
  setTimeout(()=>{
  document.getElementById('bubble').classList.add("animate__bounceIn");
  },0)
  this.ionSlides.slidePrev();
}

onSubmitTouched(){
  if (this.claimForm.get(""+this.s.ID).invalid) {
    this.auth.showAlertBoxWithAnimation("Alert !","alert","Please provide appropriate answer.");
  } else {
    this.qCount = 0;
    this.isprecheckDone = true
    // this.showAlert();
    console.log(this.data.HasPrecheckQuestion);
    if (!this.data.HasPrecheckQuestion) {
      this.sendClaim();
    } else {
      this.showAlert();
    }
  }

}

onFinalSubmitTouched(){
  if (this.claimForm.get(""+this.s.ID).invalid) {
    this.auth.showAlertBoxWithAnimation("Alert !","alert","Please provide appropriate answer.");
  } else {
    this.submitFinalClaim();
  }

}

submitFinalClaim() {
  this.sendClaim();
}

onSlidesDidChange(){

}

async onSlidesChanged() {
  const index = await this.ionSlides.getActiveIndex();
  if(this.isprecheckDone){
    this.isBeginning = await this.ionSlides.isBeginning();
    console.log(this.isBeginning);
    this.isFinalEnd = await this.ionSlides.isEnd();
    console.log("inside mainQues"+this.isFinalEnd);
  }else{
    this.isBeginning = await this.ionSlides.isBeginning();
    console.log(this.isBeginning);
    this.isEnd = await this.ionSlides.isEnd();
    console.log("inside precheck  "+this.isEnd);
  }
  
}

  onClickRadio(value){
    console.log(value);
  }

  showAlert() {
    return new Promise((resolve) => {
      this.alert.create({
          header: "Please Confirm.",
          cssClass: "custom-class",
          message: `<img src="../../../assets/imgs/solve.gif"><br> Does this solve your problem ?`,
          backdropDismiss: false,
          buttons: [
            {
              text: "No",
              handler: () => {
                this.isEnd = false;
                this.ShowClaimQuestions();
              },
            },
            {
              text: "Yes",
              handler: () => {
                this.sendClaim();
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    });
  }
  

  sendClaim() {
    this.auth.presentLoading('Please wait...');
    this.precheckAnsArray= [];
    for (let i = 0; i < Object.keys(this.claimForm.value).length; i++) {
      let precheckAns = new IPrecheck;
      precheckAns.ClaimID = "00000000-0000-0000-0000-000000000000"
      precheckAns.Answer = Object.values(this.claimForm.value)[i];
      precheckAns.QuestionID = Object.keys(this.claimForm.value)[i];
      this.precheckAnsArray.push(precheckAns);
    }
    this.auth.getUserData().then((res: any)=>{
      console.log(res);
      
      if(this.isFinalEnd){ // full claim with precheck
        console.log("sending claim with pre");
        this.auth.sendClaimAnswersWithPrecheck(JSON.stringify(this.precheckAnsArray),this.product.Hr360ProductID,res.cref,this.precheckSubmitedAns).then((res:any)=>{
          this.processResponce(res)
        }).catch(err=>{
          this.auth.dismissLoading();
          this.auth.showAlertBoxWithAnimation("Claim Declained !","alert",`${err.message}`);
        })
      }else{
        if (this.data.HasPrecheckQuestion) { //only pre check
          console.log("sending pre");
          this.precheckSubmitedAns = JSON.stringify(this.precheckAnsArray);
          this.auth.sendprecheckAnswers(this.precheckSubmitedAns,this.product.Hr360ProductID,res.cref).then((res:any)=>{
            this.processResponce(res);
          }).catch(err=>{
            this.auth.dismissLoading();
            this.auth.showAlertBoxWithAnimation("Claim Declained !","alert",`${err.message} ${err}`);
          })
        } else { // other claim without precheck
          console.log("sending other");
          this.auth.sendServicesAnswers(JSON.stringify(this.precheckAnsArray),this.product.Hr360ProductID,res.cref).then((res:any)=>{
            this.processResponce(res);
          }).catch(err=>{
            this.auth.dismissLoading();
            this.auth.showAlertBoxWithAnimation("Claim Declained !","alert",`${err.message}`);
          })
        }
      }
    })
  }

  processResponce(res: any) {
    console.log(JSON.stringify(res));
    if (res.Status === "Success") {
      this.processClaimId(res.JobID,res.Underwriting);
      // this.auth.dismissLoading();
      // this.showSuccessBoxWithAnimation("Claim Submitted !","success-tick",`Your Claim has been successfully registered with ClaimID : ${res.JobID} You can Track the progress of the claim through Track My Claim`);
    } else {
      this.auth.dismissLoading();
      this.auth.showAlertBoxWithAnimation("Claim Declained !","alert",`Status : ${res.Status}`);
    }
  }

  processClaimId(JobID, underwriting: boolean) {
    this.claimId = JobID;
        if (underwriting === true) {
      this.auth.sendUnderwriting(this.claimId)
        .then((claimResp: ClaimResponse) => {
          this.auth.dismissLoading();
          console.log(claimResp);
          this.isClaimSubmitted = true;
          this.access_value = claimResp.PaymentToBeCollected;
          this.access_reason = claimResp.PaymentReason;
          this.access_reason_explaination = claimResp.PaymentReasonExplanation;
          this.SubmittedClaimResponece = claimResp.Outcome;
          if (claimResp.Outcome === "Accepted") {
            if (
              claimResp.PaymentToBeCollected === "0" ||
              claimResp.PaymentToBeCollected == null
            ) {
              this.showSuccessBoxWithAnimation('Claim Accepted','success-tick',claimResp.OutcomeExplanation);
            } else {
              // this.router.navigate(['payment']);
              // this.openModal();
            }
          } else if (claimResp.Outcome === "Referred") {
            if (
              claimResp.PaymentToBeCollected === "0" ||
              claimResp.PaymentToBeCollected == null
            ) {
              this.showSuccessBoxWithAnimation('Claim Referred','success-tick',claimResp.OutcomeExplanation);
            } else {
              // this.router.navigate(['payment']);
              // this.openModal();
            }
          } else if (claimResp.Outcome === "Declined") {
            // declined need to pay
            if (
              claimResp.PaymentToBeCollected !== "0" &&
              claimResp.PaymentToBeCollected != null
            ) {
              // this.router.navigate(['payment']);
              // this.showPaymentModal(claimResp, claimId);
              // this.openModal();
            } else {
              // claim failed & paymentToBeCollected is 0 or null
              this.auth.showAlertBoxWithAnimation("Claim Declained !","alert",`${claimResp.OutcomeExplanation}`);
            }
          }
        })
        .catch(err => {
          this.auth.dismissLoading();
          this.auth.showAlertBoxWithAnimation("Claim Declained !","alert","Underwriting rejected"+err);
        });
    } else {
      // Todo: underwriting false
      // write a good message
      this.auth.dismissLoading();
      this.showSuccessBoxWithAnimation("Claim Registered",'success-tick',`Your claim has been registered with claim id: ${this.claimId}`);
    }
  }

  ShowClaimQuestions() {
    for (let i = 0; i < Object.keys(this.claimForm.value).length; i++) {
      let precheckAns = new IPrecheck;
      precheckAns.ClaimID = "00000000-0000-0000-0000-000000000000"
      precheckAns.Answer = Object.values(this.claimForm.value)[i];
      precheckAns.QuestionID = Object.keys(this.claimForm.value)[i];
      this.precheckAnsArray.push(precheckAns);
    }
    this.precheckSubmitedAns = JSON.stringify(this.precheckAnsArray);
    this.ionSlides.slideTo(0,100);
    this.questions = [];
    console.log("No Problem not Resolved");
    if(this.data.Questions && this.data.Questions.length){
      this.questions = this.data.Questions;
      console.log(this.questions);
      this.s = this.questions[this.qCount];
      console.log(this.s);
      console.log(this.qCount+ "length of main question "+this.questions.length);
      console.log(this.questions[this.qCount]);
      this.questions.forEach(element => {
        this.claimForm.addControl(element.ID,new FormControl("",Validators.required))
      });
    }else{
      this.noQuestionFlag = true;
    }

  }

  onClickCallUs(){
    window.open('tel:03450774177');
  }


  showSuccessBoxWithAnimation(header : string, animfileName : string, msg :string) {
    return new Promise((resolve) => {
      this.alert.create({
          header: header,
          cssClass: "custom-class",
          message: `<img src="../../../assets/imgs/${animfileName}.gif"><br> ${msg}`,
          backdropDismiss: false,
          buttons: [
            {
              text: "OK",
              handler: () => {
                this.router.navigate(['dashboard'])
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    });
  }

  // async openModal(){
  //   const modal = await this.modalCtrl.create({
  //     component : PaymentPage,
  //     canDismiss : true,
  //     swipeToClose : true,
  //     // presentingElement : document.querySelector('.page'),
  //           // presentingElement : await this.modalCtrl.getTop()
  //     initialBreakpoint : 0.7,
  //     breakpoints : [0,0.7,0.9],
  //     componentProps : {
  //       ammount : this.access_value
  //     },
      
  //   });
  //   modal.onDidDismiss().then(res=>{
  //     console.log("### "+JSON.stringify(res));
  //     if(res.data){
  //       this.chargeAccess(res.data.stripeToken);
  //     }else{
  //       this.auth.presentToast("Transaction cancled.")
  //     }
  //   })
  //   await modal.present();
  // }


  chargeAccess(token) {
    let params = new HttpParams()
    .set('stripeToken', token)
    .set('access', this.access_value)
    this.auth.httpSend('post',params,'ChargePayment').subscribe((res:any)=>{
      this.stripeOutcome = res;
      if(this.stripeOutcome.Status === "succeeded" && this.stripeOutcome.Paid){
        this.auth.dismissLoading();
        this.isPaymentDone = true;
      }else{
        this.auth.dismissLoading();
        this.auth.showAlertBoxWithAnimation("Transaction","alert",`Unknown error encountered. Your Payment status is ${this.stripeOutcome.Status}, Transaction id is ${this.stripeOutcome.BalanceTransactionId}`)
      }
    },(err=>{
      this.stripeOutcome = err;
      this.isPaymentFailed = true;
      this.auth.dismissLoading();
    }))
  }

  receiptClicked(){
    this.iab.create(this.stripeOutcome.ReceiptUrl,'_self',{
      fullscreen :'yes',
      toolbarcolor : '#dd2127',
      hideurlbar : 'yes'
    });
  }

  CompleteClicked(){
    if (this.SubmittedClaimResponece === "Accepted") {
        this.showSuccessBoxWithAnimation('Claim Accepted','success-tick',`Your Claim is Successfully Accepted. Claim ID : ${this.claimId}`);
      } 
    if (this.SubmittedClaimResponece === "Referred") {
      
        this.showSuccessBoxWithAnimation('Claim Referred','success-tick', `Your Claim is Successfully Referred. Claim ID : ${this.claimId}`);
    }
    if (this.SubmittedClaimResponece === "Declined") {
      // declined need to pay
        // claim failed & paymentToBeCollected is 0 or null
        this.auth.showAlertBoxWithAnimation("Claim Declained !","alert",`Your Claim is Successfully Declained. Claim ID : ${this.claimId}`);
      }
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
        this.stripetoken = token.id
        this.isModalOpen = false;
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

  openModal(value){
    this.isModalOpen = value;
  }

  onWillDismiss(event){
    console.log(event);
    this.isModalOpen = false;
    if(this.stripetoken){
      this.chargeAccess(this.stripetoken);
    }else{
      this.auth.presentToast("Transaction cancled.")
    }
  }

}
