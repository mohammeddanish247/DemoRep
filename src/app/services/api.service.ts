import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { NavigationExtras, Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http"
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { IUserCredential, IUserData } from '../interface/user-login';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  liveUrl = "https://247app-api.myvp.cloud/Service1.asmx";
  url_api = "https://webservices.home360.org.uk/Service1.asmx";
  url2 = "https://api2.home360.org.uk/service1.asmx";
  urlBeta = "http://beta-api3.247development.uk/service1.asmx"
  localUrl = "http://localhost:52600/Service1.asmx"
  new_url = "http://myaccountapi.247development.uk/service1.asmx";
  
  url: string = "https://myaccountapinew.247development.uk/service1.asmx";

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  url_underwriting: string;
  riskAddresses : any = [];

  constructor(
    private http : HttpClient,
    private alert : AlertController,
    private router : Router,
    private navCtrl : NavController,
    private storage : Storage,
    private loading : LoadingController,
    private toastController : ToastController
    ) {
   }


  async loadToken() {
    console.log("load token");    
    const token = await this.storage.get('TOKEN_KEY');
      if (token) {
        console.log('set token: ', token);
        this.token = token;
        this.isAuthenticated.next(true);
      } else {
        console.log("no token");
        this.isAuthenticated.next(false);
      }
  }


  async checkNetworkStatus() {
      const status = await (await Network.getStatus()).connected
      return status
  };


  // loginService(surname : string, cref : string){
  //   let params = new HttpParams()
  //   .set('cref', cref)
  //   .set('surname', surname)
  //   const loginRes = this.http.post(this.url_api+'LoginUserRefAndSurname',params);
  //   return loginRes
  // }



  httpSend (method : string, params : HttpParams, endPoint : string) {
      switch (method) {
        case "post":
          return this.http.post(this.liveUrl+"/"+endPoint,params);
        
        case "get":
          return this.http.get(this.liveUrl+"/"+endPoint);
      
        default:
          this.showAlertBox("you API method is name is not defined it should be either GET or POST")
          break;
      }
  }

  httpSend_New (method : string, params : HttpParams, endPoint : string) {
    switch (method) {
      case "post":
        return this.http.post(this.url+"/"+endPoint,params);
      
      case "get":
        return this.http.get(this.url+"/"+endPoint);
    
      default:
        this.showAlertBox("you API method is name is not defined it should be either GET or POST")
        break;
    }
  }

  async showAlertBox(msg : string, hdr? : string , anim?){
    let alert = await this.alert.create({
      message : msg,
      header : hdr || "Alert !",
      buttons: ['Dismiss'],
      cssClass : "my-custom-class",

    });
    alert.present();
  }

  showAlertBoxWithAnimation(header : string, animfileName : string, msg :string) {
    return new Promise((resolve) => {
      this.alert.create({
          header: header,
          cssClass: "custom-class",
          message: `<img src="../../../assets/imgs/${animfileName}.gif"><br> ${msg}`,
          backdropDismiss: false,
          buttons: [
            {
              text: "Dismiss",
              handler: () => {
                resolve("");
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    });
  }

  async showAlertBoxWithButton(msg : string, hdr : string , btn_name : string){
    let alert = await this.alert.create({
      message : msg,
      header : hdr,
      buttons: ['Dismiss' , btn_name],
      cssClass : "my-custom-class",

    });
    alert.present();
  }

  loginAuthentication(cref:string,surname:string){
    return new Observable<string>((observer)=>{      
      console.log(cref, surname);
      console.log("###");
    let params = new HttpParams()
    .set("cref",cref)
    .set("surname",surname)
    .set("Source","3")
    this.httpSend_New("post",params,"Login_MA").subscribe(
    (data : string)=>{ 
      console.log("### "+data);
      if (data === "Success") {
        console.log("### "+data);
        
        this.storage.set('TOKEN_KEY', data).then(res=>{
          this.isAuthenticated.next(true);
          observer.next("Success")  
          observer.complete();
        });

        this.getUserDataAndLead(cref, surname).then((res:any)=>{
          if(res){
            let userdata : any = res;
            userdata.Cref = cref;
            userdata.LastName = surname;
            console.log("sdafasfsadfsadfsadfsadf");
            console.log(userdata);
            
            
            this.storage.set('Userdata', userdata);
          }else{
            this.presentToast("Userdata not available");
          }
        }).catch(err=>{
          this.presentToast("Userdata not available ");
        });
             
      } else {
        observer.error("Login Access Denied!");
        observer.complete();           
      }    
    },
    (err)=>{
      console.log("### err");
      observer.error(err);
      observer.complete();        
    }
    );
    });    
  }

  getUserDataAndLead(cref,surname) {
    return new Promise((resolve,reject)=>{
      console.log(cref, surname);
      
      let params = new HttpParams()
      .set("cref",cref) //"WS0052980"
      .set("surname",surname)
      this.httpSend_New("post",params,"GetLead_MA").subscribe(
        (data : any)=>{ 
          console.log(data);
          
          resolve(data);
        },
        (err)=>{
          reject(err)      
        }
        )
    });
  }

  logout() {
    this.isAuthenticated.next(false);
    this.storage.remove('TOKEN_KEY').then(res=>{
      this.storage.remove('user_image');
      this.router.navigate(['login'],{replaceUrl:true});
    })
    this.storage.remove('Userdata');
  }

  async getuserid(){
    return await this.storage.get('Userdata');
  }

  getRiskAddresses(productValue){
    return new Promise(async (resolve, reject) => {
      let LeadID = await this.getuserid().then((res : any)=>{
        return res.LeadID;
      })
      console.log("Danishhhh "+LeadID);
      console.log("Danishhhh "+productValue);
      
      if (LeadID){
        let params = new HttpParams()
      .set("LeadID",LeadID) //"WS0052980"
      .set("MasterGroupID",productValue)
      this.httpSend("post",params,"GetRiskAddressesByLeadIDandGroupType").subscribe((res : any)=>{        
        this.riskAddresses = res ;
        // console.log(this.riskAddresses.length);        
        // for (let i = 0; i < res.length; i++) {
        //   this.riskAddresses.push(res[i])
        // }
        console.log(this.riskAddresses);
        resolve(this.riskAddresses);
      },
      err=>{
        reject(err)
      })
      }
      else{
        console.log("no lead id found");
        reject("no lead id found");
      }
    });
  }

  getProductsList(LeadID, productValue) {
    return new Promise(async (resolve, reject) => {
        let params = new HttpParams()
      .set("LeadID",LeadID) //"WS0052980"
      .set("MasterGroupID",productValue)
      this.httpSend("post",params,"GetProductsByLeadIDAndMasterGroup").subscribe(res=>{
        resolve(res);
      },
      err=>{
        reject(err)
      })
      });
  }

  public getProducts(cref, userid) {
    return new Promise((resolve, reject) => {
      let params = new HttpParams()
      .set('cref',cref)
      .set('leadid',userid)
      this.httpSend('post',params,'GetProductsByRef').subscribe((res)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      })
    });
  }

  GetAllLivePoliciesByLead() {
    return new Promise(async (resolve, reject) => {
      let LeadID = await this.getuserid().then((res: any)=>{
        return res.LeadID;
      })
      let params = new HttpParams()
      .set("leadid",LeadID)
      this.httpSend("post",params,"GetAllLivePoliciesByLead").subscribe(res=>{
        resolve(res);
      },
      err=>{
        reject(err)
      })
    });
  }

  public getEligibilityProducts(cref, leadid) {
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("cref",cref)
      .set("leadid",leadid)
      this.httpSend("post",params,"GetProductsForElgibilityByRef").subscribe(res=>{
        resolve(res);
      },
      err=>{
        reject(err)
      })
    });
  }

  getEligibilityFields(productid,leadid){
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("productid",productid)
      .set("leadid",leadid)
      this.httpSend("post",params,"GetEligibilitiesByProduct").subscribe(res=>{
        resolve(res);
      },
      err=>{
        reject(err)
      })
    });
  }

  public submitEligibility(data: any) {
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("json",JSON.stringify(data))
      this.httpSend("post",params,"SaveAnswersByQuoteEligibilityID").subscribe(res=>{
        resolve(res);
      },
      err=>{
        reject(err)
      })
    });
  }

  hasService(productID) {
    let pid = parseInt(productID);
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("ProductID",pid)
      this.httpSend("post",params,"ProductHasService").subscribe(res=>{
        resolve(res);
      },
      err=>{
        reject(err)
      })
    });
  }
       
  public viewUserServiceContract() {
    this.storage.get("TOKEN_KEY").then(val => {
      this.getPolicyDocument(val).then((res)=>{
            console.log(res);
            this.navToDoc(res)
            },
            err => {
              // me.util.dismissLoader();
              // me.util.showToast("An error occurred", () => {
              //   console.log(err);
              // });
            },
          );
    }).catch(err=>{
      //me.util.dismissLoader();
    });
  }        
  
  public getPolicyDocument(val) {
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("leadid",val)
      this.httpSend("post",params,"GetServiceDocumentByLead").subscribe((res)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      })
    });
  }

  checkifETAorFutureService(cref: string) {
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("CRef",cref)
      this.httpSend("post",params,"CheckIfETAorFutreService").subscribe((res)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      })
    });
  }

  checkInceptionDateandServiceDueDate(cref: string) {
    return new Promise(async (resolve, reject) => {
      let params = new HttpParams()
      .set("lref",cref)
      this.httpSend("post",params,"CheckInceptionDateAndServiceDueDate").subscribe((res)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      })
    });
  }

  navToDoc(link) {
    window.open(
      `https://docs.google.com/viewer?url=${link}`,
      "_system",
      "location=yes",
    );
  }


  getMultiple(keys: string[]) {
    const promises = [];
    keys.forEach(key => promises.push(this.storage.get(key)));
    return Promise.all(promises).then(values => {
      const result = {};
      values.map((value, index) => {
        result[keys[index]] = value;
      });
      return result;
    });
  }

  getUserData(){
    return this.storage.get('Userdata');
  }

  getManufacturers() {
    return new Promise((resolve, reject) => {
      let params = new HttpParams();
      this.httpSend('get',params,'ListOfManufacturer').subscribe((res)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      });
    });
  }

  getProductsQs(Hr360ProductID) {
    return new Promise((resolve, reject) => {
      let params = new HttpParams()
      .set("productID",Hr360ProductID)
      this.httpSend('post',params,'GetProductQsType_New_WithoutPreCheck').subscribe((res)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      });
    });
  }

  getClaimsbyCRef(cref){
    return new Promise(async (resolve, reject) => {
      if (cref) {
        let params = new HttpParams()
        .set("CRef",cref)
        this.httpSend('post',params,'TrackMyClaimsByCRefNew').subscribe((res:any)=>{
          resolve(res.ClaimDetail);
        },
        err=>{
          reject(err);
        });
      }
    });
  }

  sendprecheckAnswers(QsAns,HR360ProductID : string, cref : string){
    return new Promise(async (resolve, reject) => {
      console.log(QsAns,HR360ProductID,cref);
      if (cref) {
        let params = new HttpParams()
        .set("QsAns",QsAns)
        .set("HR360ProductID",HR360ProductID)
        .set("PolicyRef",cref)
        this.httpSend('post',params,'SaveGenericAnswers_New').subscribe((res:any)=>{
          resolve(res);
        },
        err=>{
          reject(err);
        });
      } else{
        reject("cref not found");
      }
    });
  }
  //SaveProductAnswerReturnClaimDetailsForGenericQuestions

  // call for precheck + main questions
  sendClaimAnswersWithPrecheck(QsAns,HR360ProductID : string, cref : string, precheckAns){
    return new Promise(async (resolve, reject) => {
      let LeadID = await this.getuserid().then((res :any)=>{
        return res.LeadID;
      })
      if (LeadID) {
        let params = new HttpParams()
        .set("QsAns",QsAns)
        .set("ProductID",HR360ProductID)
        .set("PolicyRef",cref)
        .set("Source","3")
        .set("genericAnswers",precheckAns)
        .set("VulnerabilityID","3")
        .set("leadid",LeadID)
        this.httpSend('post',params,'SaveProductAnswerReturnClaimDetailsForGenericQuestions').subscribe((res:any)=>{
          resolve(res);
        },
        err=>{
          reject(err);
        });
      }
    });
  }

  sendServicesAnswers(QsAns,HR360ProductID : string, cref : string){
    return new Promise(async (resolve, reject) => {
        let params = new HttpParams()
        .set("QsAns",QsAns)
        .set("ProductID",HR360ProductID)
        .set("PolicyRef",cref)
        .set("Source","2")
        this.httpSend('post',params,'SaveProductAnswerReturnClaimDetails').subscribe((res:any)=>{
          resolve(res);
        },
        err=>{
          reject(err);
        });
      });
  }

  sendUnderwriting(claimId: any) {
    const source = 2; // from app
    return new Promise((resolve, reject) => {
      let params = new HttpParams()
      .set("ClaimID",claimId)
      .set("source",source)
      this.httpSend('post',params,"ProcessUnderwritingJson").subscribe((res:any)=>{
        resolve(res);
      },
      err=>{
        reject(err);
      });
    });
  }


  async presentLoading(msg) {
    const loading = await this.loading.create({
      spinner: 'circles',
      message: msg,
    });
    return await loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }
  

  PresentAlert(msg: string, hdr?: string) {
    return new Promise((resolve) => {
      this.alert
        .create({
          header: hdr || "Alert Message",
          cssClass: "custom-class",
          subHeader: msg,
          backdropDismiss: false,
          buttons: [
            {
              text: "OK",
              handler: () => {
                resolve("");
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  getPolicyDetails(GroupID : number){
    let params = new HttpParams()
    .set('groupId',GroupID);
    return this.httpSend_New('post',params,'GetProducts_MA').pipe(map((data : any)=>{
      console.log(data);
      const reqData = {
        policyName : data.GroupName,
        coveredProducts : data.GrpProducts.Products,
        HasBoilerService : data.HasBoilerService,
        HasCP12 : data.HasCP12,
        HasExcess : data.HasExcess,
        IPIDDocumentLink : data.IPIDDocumentLink,
        TOCDocumentLink : data.TOCDocumentLink,

      }
      return reqData;
    }))
    //   console.log(res);
    // });
  }

  getLivePolicies(LeadID : string){
    let params = new HttpParams()
    .set('LeadID',LeadID)
    return this.httpSend_New('post',params,"GetAllLinkedCases_MA");

  }

  getDocumentsbyLead(LeadID : string){
    console.log(LeadID);
    
    let params = new HttpParams()
    .set('LeadId',LeadID)
    return this.httpSend_New('post',params,"GetDocument_MA");

  }

  DoesPolicyHasService(cref : string){
    let params = new HttpParams()
    .set('CRef',cref)
    return this.httpSend_New('post',params,"DoesPolicyHasService_MA");

  }

  CheckInceptionDateAndServiceDueDate(cref){
    let params = new HttpParams()
    .set('lref',cref)
    return this.httpSend_New('post',params,"CheckInceptionDateAndServiceDueDate_MA");
  }

  GetEngineerForClusterWSNoMaxJson(claimId){
    let params = new HttpParams()
    .set('leadid',claimId)
    .set('postcode',"")
    .set('productid',"")
    .set('claimtypeid',"")
    .set('ClaimID',claimId)
    return this.httpSend_New('post',params,"GetEngineer_MA");
  }

  bookEngineer(claimId,date,address,username,phone1,phone2,postcode,appointmentID,isBoilerWorking,isBoilerAccessible,whereIsBoilerLocated,isParkingAvailable){
    let params = new HttpParams()
    .set('claimId',claimId)
    .set('prefereddate',date) // mm/dd/yyyy
    .set('jobType',"")
    .set('jobNumber',"")
    .set('address', address)
    .set('address2',"")
    .set('contactname', username)
    .set('phone',phone1)
    .set('phone2',phone2)
    .set('postcode',postcode)
    .set('userId',0)
    .set('username',"")
    .set('moreInfo',"")
    .set('engineerId',"")
    .set('jobId',"")
    .set('AppointTime',"")
    .set('addNewJob',"1")
    .set('SendEmailToEngineer',true)
    .set('EngineerClusterAppointmentId',appointmentID)
    .set('IsBoilerWorking',isBoilerWorking)
    .set('IsBoilerAccessible',isBoilerAccessible)
    .set('WhereIsBoilerLocated',whereIsBoilerLocated)
    .set('Source',"3")
    .set('Parking',isParkingAvailable)
    return this.httpSend_New('post',params,"BookEngineer_MA");
  }

  }

