import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-eligibility-form',
  templateUrl: './eligibility-form.page.html',
  styleUrls: ['./eligibility-form.page.scss'],
})
export class EligibilityFormPage implements OnInit {

  fields: any = [];
  validation: any = {};
  productid: string;
  leadid: string;
  cref : string
  model: any = {};
  complete: boolean;

  constructor(
    private auth: ApiService,
    private alertCtrl: AlertController,
    private router: Router,
  ) {

    // this.productid = this.navParams.get("ProductID");
    // this.leadid = this.navParams.get("LeadID");
    // this.complete = this.navParams.get("Complete") == "true";
  }

  ngOnInit() {
    console.log("inside eligibility-form page");
    let a = this.router.getCurrentNavigation().extras.state;
    this.productid = a.ProductID;
    this.leadid = a.LeadID;
    this.complete = a.Complete;
    this.cref = a.cref;
    console.log(this.cref);
    this.getEligibilityFields();
  }



  getEligibilityFields() {
    let me = this;
    this.auth.getEligibilityFields(this.productid,this.leadid).then((res: any)=>{
      console.log(res);
      if (res.length) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].EligibilityID) {
            if (res[i].Type == "Checkbox") {
              //cause their implementation is STUPID!
              //Dont want to use toLowerCase in case they send something besides a Boolean or a string
              me.model[res[i].EligibilityID] =
                res[i].Value &&
                (res[i].Value== "true" ||
                  res[i].Value== "True" ||
                  res[i].Value== true)
                  ? true
                  : false;
            } else {
              me.model[res[i].EligibilityID] = res[i].Value
                ? res[i].Value
                : "";
              if (
                res[i].Mandatory == "true" ||
                res[i].Mandatory == true
              ) {
                me.validation[res[i].EligibilityID] = false;
              }
            }
            me.fields.push({
              Question: res[i].Question,
              Type: res[i].Type,
              QuoteID: res[i].QuoteID,
              EligibilityID: res[i].EligibilityID,
              Mandatory:
                res[i].Mandatory == "true" ||
                res[i].Mandatory == true
                  ? true
                  : false,
            });
          }
          
        }
      } else {
        //show alert
        // me.showAlert(
        //   "No fields avaliable",
        //   "Sorry, there are no fields for this product.",
        //   function () {
        //     console.log("Dismissed alert");
        //     me.navCtrl.pop();
        //   },
        // );
      }
      
    },
    err =>{
      //show error
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EligibilityFormPage");
    let me = this;
    //get list of products
    // this.auth
    //   .getEligibilityFields(this.productid, this.leadid)
    //   .map(res => res.text())
    //   .subscribe(
    //     data => {
    //       xml2js.parseString(data, function (err, result) {
    //         //safety check
    //         if (
    //           result.ArrayOfEligibilityByProduct &&
    //           result.ArrayOfEligibilityByProduct.EligibilityByProduct &&
    //           result.ArrayOfEligibilityByProduct.EligibilityByProduct.length
    //         ) {
    //           let array =
    //             result.ArrayOfEligibilityByProduct.EligibilityByProduct;
    //           for (let i = 0; i < array.length; i++) {
    //             if (array[i].EligibilityID[0]) {
    //               if (array[i].Type[0] == "Checkbox") {
    //                 //cause their implementation is STUPID!
    //                 //Dont want to use toLowerCase in case they send something besides a Boolean or a string
    //                 me.model[array[i].EligibilityID[0]] =
    //                   array[i].Value &&
    //                   (array[i].Value[0] == "true" ||
    //                     array[i].Value[0] == "True" ||
    //                     array[i].Value[0] == true)
    //                     ? true
    //                     : false;
    //               } else {
    //                 me.model[array[i].EligibilityID[0]] = array[i].Value
    //                   ? array[i].Value[0]
    //                   : "";
    //                 if (
    //                   array[i].Mandatory[0] == "true" ||
    //                   array[i].Mandatory == true
    //                 ) {
    //                   me.validation[array[i].EligibilityID[0]] = false;
    //                 }
    //               }
    //               me.fields.push({
    //                 Question: array[i].Question[0],
    //                 Type: array[i].Type[0],
    //                 QuoteID: array[i].QuoteID[0],
    //                 EligibilityID: array[i].EligibilityID[0],
    //                 Mandatory:
    //                   array[i].Mandatory[0] == "true" ||
    //                   array[i].Mandatory == true
    //                     ? true
    //                     : false,
    //               });
    //             }
    //           }
    //         } else {

    //         }
    //       });
    //     },
    //     err => {
         
    //     },
    //     () => {
          
    //     },
    //   );
  }

  submitForm() {
    console.log(this.model);
    let me = this;
    let values = this.fields.slice(0);
    //check mandatory
    this.sanityCheck(values, function (flag) {
      if (!flag) {
        for (let i = 0; i < values.length; i++) {
          let field = values[i];
          if (me.model[field.EligibilityID]) {
            values[i].value = me.model[field.EligibilityID];
          }
        }

        // send values
        if (values) {
          me.auth.submitEligibility(values).then(res=>{
            console.log(res);            
          })
        }
      } else {
        // me.showAlert(
        //   "Alert",
        //   "Please fill in all the required fields",
        //   () => {},
        // );
      }
    });
  }

  sanityCheck(fields, callback) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].mandatory && this.model[fields[i].eligibilityid] === "") {
        return callback(true);
      }
    }
    return callback(false);
  }

  //this sucks!!!
  checkFields(event, callback) {
    for (let i in this.model) {
      if (this.model[i] === "") {
        if (this.validation[i] !== undefined) {
          this.validation[i] = true;
        }
      } else {
        if (this.validation[i] !== undefined) {
          this.validation[i] = false;
        }
      }
    }
    callback && callback();
  }
}
