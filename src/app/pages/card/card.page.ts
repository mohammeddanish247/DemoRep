import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { PaymentPage } from '../payment/payment.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  stripeOutcome: any;

  constructor(private modalCtrl: ModalController, private auth : ApiService) { }

  ngOnInit() {
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component : PaymentPage,
      canDismiss : true,
      swipeToClose : true,
      // presentingElement : document.querySelector('.page'),
      initialBreakpoint : 0.7,
      breakpoints : [0,0.7,0.9],
      componentProps : {
        ammount : "45"
      }
      // presentingElement : await this.modalCtrl.getTop()
    });
    modal.onDidDismiss().then(res=>{
      console.log(res.data.stripeToken);
    })
    await modal.present();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  // chargeAccess(token) {
  //   let params = new HttpParams()
  //   .set('stripeToken', token)
  //   .set('access', "50")
  //   this.auth.httpSend('post',params,'ChargePayment').subscribe((res:any)=>{
  //     this.stripeOutcome = res;
  //     console.log(this.stripeOutcome.Status);
  //     if(this.stripeOutcome.Status === "succeeded" && this.stripeOutcome.Paid){
  //       this.auth.dismissLoading();
  //       console.log("inside success");
        
  //       console.log(this.stripeOutcome);
  //     }else{
  //       this.auth.dismissLoading();
  //       console.log("inside else");
  //       console.log(this.stripeOutcome);
  //     }
  //   },(err=>{
  //     this.stripeOutcome = err;
  //     console.log("inside error");
  //     console.log(this.stripeOutcome);
  //     this.auth.dismissLoading();
  //   }))
  // }

  
  
}
