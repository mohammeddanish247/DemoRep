import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { IAppointmentData, IbookingInfo } from 'src/app/interface/products';
import { IUserData } from 'src/app/interface/user-login';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-service',
  templateUrl: './book-service.page.html',
  styleUrls: ['./book-service.page.scss'],
})
export class BookServicePage implements OnInit {

  @ViewChild('option1',{static: true}) op1: ElementRef;
  @ViewChild('option2',{static: true}) op2: ElementRef;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  isBeginning: boolean = true;
  isEnd: boolean = false;

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };


  showQuestion : boolean = false;
  userdata: any ;
  HasBoilerService: boolean;
  showServicesQuestions: boolean;
  BookingInfo: IbookingInfo;
  isloading : boolean;
  serviceDueData: Date;
  EngineerAllocatedForDate: Date;
  AppointmentData : Array<IAppointmentData> = [];
  questions: any[];
  qCount: number = 0;
  s: { DropdownOptions: string; ID: number; Information: string; IsActive: boolean; PreCheckImageDesktop: string; PreCheckImageMobile: string; PreCheckImageTablet: string; ProductId: string; QOrder: number; Question: string; ShowInApp: boolean; Type: string; };
  claimForm =new FormGroup({})
  serviceDropDown: any[];
  isServiceSubmitted: boolean = false;
  isBookingInfoAvailabe: boolean;
  AppointmentFullData: any;


  constructor(
    private storage : Storage, 
    private router : Router,
    private auth : ApiService,
    private datePipe : DatePipe,
    private alert : AlertController
  ) {
    this.userdata =  this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit() {
    this.isloading = true ;
    console.log(this.userdata.Cref);    
      this.auth.DoesPolicyHasService(this.userdata.Cref).subscribe((resp)=>{
        console.log(resp);
      if (resp) {
        console.log(" inside if ");
        this.auth.CheckInceptionDateAndServiceDueDate(this.userdata.Cref).subscribe((res:any)=>{
          console.log(res);
          this.BookingInfo = res;
          this.isBookingInfoAvailabe = true
          if(res){
            const duedate = parseInt(this.BookingInfo.ServiceDueDate.slice(6,-2));
            const enggAllDate = parseInt(this.BookingInfo.EngineerAllocatedForDate.slice(6,-2));
            this.serviceDueData = new Date(this.datePipe.transform(duedate, 'EEEE, MMMM d, y'));
            this.EngineerAllocatedForDate = new Date(this.datePipe.transform(enggAllDate, 'EEEE, MMMM d, y'));
            this.auth.GetEngineerForClusterWSNoMaxJson(this.BookingInfo.ClaimID).subscribe((app: any)=>{
              console.log(app);
              this.AppointmentFullData = app ;
              for (let i = 0; i < app.length; i++) {
               const appStartTime =  parseInt(app[i].ClusterAppointmentStartTime.slice(6,-2));
               const appEndTime =  app[i].ClusterAppointmentEndTime;
               const formattedDate = this.datePipe.transform(appStartTime, 'EEEE, MMMM d, y');
               let obj : IAppointmentData = {
                  ClusterAppointmentStartTime : formattedDate,
                  ClusterAppointmentEndTime : appEndTime,
                  ClusterAppointmentId : app[i].ClusterAppointmentId,
               }
               this.AppointmentData.push(obj);
              } 
              this.serviceDropDown = [];
              for (let i = 0; i < this.AppointmentData.length; i++) {
                let obj = {
                  option :  `${this.AppointmentData[i].ClusterAppointmentStartTime} - (${this.AppointmentData[i].ClusterAppointmentEndTime})`,
                  value : this.AppointmentData[i].ClusterAppointmentId
                }
                this.serviceDropDown.push(obj);        
              }  
              this.isloading = false ;       
            },(err:any)=>this.auth.showAlertBox(`${err.statusText} ${err.error} `,`${err.status+" "+err.name}`) //${err.message}                
            );
          }else{
            console.log(" inside else");
            this.HasBoilerService = true
            this.isloading = false ;
          }

        },(err=>{
          this.auth.showAlertBox(`${err.statusText} ${err.error} `,`${err.status+" "+err.name}`); //${err.message}
        }))
      } else {
        console.log(" inside else");
        this.HasBoilerService = true
        this.isloading = false ;
      }
  });
  }

  showQuestions() {
    let location = [
       {option: 'Kitchen', value: 'Kitchen'},
       {option: 'Living Room', value: 'Living Room'},
       {option: 'Bedroom', value: 'Bedroom'},
       {option: 'Utility Room', value: 'Utility Room'},
       {option: 'Attic', value: 'Attic'},
       {option: 'Bathroom', value: 'Bathroom'},
       {option: 'Garage', value: 'Garage'}]

      this.showQuestion = true;
      this.questions = [
        { Options: this.serviceDropDown, ID: 1, Question: "Please Pick Service Date.",Type: "Dropdown", Information: "Please call our office on 03450774177 for further assistance. ",IsActive: true,PreCheckImageDesktop: "http://precheckimages.home360.org.uk/8f7d8a7c-26a0-4758-a854-fecb92ae903f-Can_you_smell_gas_v1.jpg",PreCheckImageMobile: "http://precheckimages.home360.org.uk/401635b8-a45f-4d1c-ac30-ca68c83a5bdd-Can_you_smell_gas_v1.jpg",PreCheckImageTablet: "http://precheckimages.home360.org.uk/f398146e-bb79-4a43-9fbe-7b60cdafc115-Can_you_smell_gas_v1.jpg",ProductId: "049ef944-ffb9-4185-8378-16b678401c53",QOrder: 1},
        { Options: "", ID: 2, Question: "Is the boiler functional?",Type: "Yes/No", Information: "Please call our office on 03450774177 for further assistance. ",IsActive: true,PreCheckImageDesktop: "http://precheckimages.home360.org.uk/8f7d8a7c-26a0-4758-a854-fecb92ae903f-Can_you_smell_gas_v1.jpg",PreCheckImageMobile: "http://precheckimages.home360.org.uk/401635b8-a45f-4d1c-ac30-ca68c83a5bdd-Can_you_smell_gas_v1.jpg",PreCheckImageTablet: "http://precheckimages.home360.org.uk/f398146e-bb79-4a43-9fbe-7b60cdafc115-Can_you_smell_gas_v1.jpg",ProductId: "049ef944-ffb9-4185-8378-16b678401c53",QOrder: 1},
        { Options: "", ID: 3, Question: "Is the boiler easily accessible?",Type: "Yes/No", Information: "Please call our office on 03450774177 for further assistance. ",IsActive: true,PreCheckImageDesktop: "http://precheckimages.home360.org.uk/8f7d8a7c-26a0-4758-a854-fecb92ae903f-Can_you_smell_gas_v1.jpg",PreCheckImageMobile: "http://precheckimages.home360.org.uk/401635b8-a45f-4d1c-ac30-ca68c83a5bdd-Can_you_smell_gas_v1.jpg",PreCheckImageTablet: "http://precheckimages.home360.org.uk/f398146e-bb79-4a43-9fbe-7b60cdafc115-Can_you_smell_gas_v1.jpg",ProductId: "049ef944-ffb9-4185-8378-16b678401c53",QOrder: 1},
        { Options: location, ID: 4, Question: "Where is the boiler located?",Type: "Dropdown", Information: "Please call our office on 03450774177 for further assistance. ",IsActive: true,PreCheckImageDesktop: "http://precheckimages.home360.org.uk/8f7d8a7c-26a0-4758-a854-fecb92ae903f-Can_you_smell_gas_v1.jpg",PreCheckImageMobile: "http://precheckimages.home360.org.uk/401635b8-a45f-4d1c-ac30-ca68c83a5bdd-Can_you_smell_gas_v1.jpg",PreCheckImageTablet: "http://precheckimages.home360.org.uk/f398146e-bb79-4a43-9fbe-7b60cdafc115-Can_you_smell_gas_v1.jpg",ProductId: "049ef944-ffb9-4185-8378-16b678401c53",QOrder: 1},
        { Options: "", ID: 5, Question: "Is parking available? ",Type: "Yes/No", Information: "if not, this needs to be arranged by the policy holder",IsActive: true,PreCheckImageDesktop: "http://precheckimages.home360.org.uk/8f7d8a7c-26a0-4758-a854-fecb92ae903f-Can_you_smell_gas_v1.jpg",PreCheckImageMobile: "http://precheckimages.home360.org.uk/401635b8-a45f-4d1c-ac30-ca68c83a5bdd-Can_you_smell_gas_v1.jpg",PreCheckImageTablet: "http://precheckimages.home360.org.uk/f398146e-bb79-4a43-9fbe-7b60cdafc115-Can_you_smell_gas_v1.jpg",ProductId: "049ef944-ffb9-4185-8378-16b678401c53",QOrder: 1},
      ];
      console.log(this.questions);
      this.s = this.questions[this.qCount];
      this.questions.forEach(element => {
        this.claimForm.addControl(element.ID,new FormControl("",Validators.required))
      });

      // this.noQuestionFlag = true;
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
      let filteredData = this.AppointmentFullData.filter((x)=>{
        return x.ClusterAppointmentId == this.claimForm.value[1];
      })
      console.log(filteredData);
      const selectedDate = parseInt(filteredData[0].ClusterAppointmentStartTime.slice(6,-2));
      let date = new Date(selectedDate)
      let formattedDate = this.datePipe.transform(date, 'MM/dd/yyyy');
      // const formattedDate = new Date(this.datePipe.transform(selectedDate,'MM/dd/yyyy','GMT', 'en-US')); 
      // const formattedDate = formatDate(selectedDate, 'dd/MM/yyyy', 'en-US');    
      console.log(this.claimForm.value);
      console.log(this.BookingInfo);
      console.log(formattedDate);
      this.showQuestion =false ;
      this.isloading = true;
      this.isServiceSubmitted = true ;
      this.auth.bookEngineer(this.BookingInfo.ClaimID, formattedDate , this.BookingInfo.Address,this.BookingInfo.ContactName,
        this.BookingInfo.ContactPhone,this.BookingInfo.HomePhone,this.BookingInfo.PostCode,
        this.claimForm.value[1],this.claimForm.value[2],this.claimForm.value[3],this.claimForm.value[4],this.claimForm.value[5]).subscribe(bookingres=>{
          console.log(bookingres);
          this.showSuccessBoxWithAnimation('Service Booked Successfully','success-tick','Your service has been booked successfully, your job id is '+bookingres);
        },err=>{
          this.showSuccessBoxWithAnimation('Service Declined!','alert',err);
        });
    }
  
  }

  onSlidesDidChange(){
    
  }
  

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
      this.isBeginning = await this.ionSlides.isBeginning();
      this.isEnd = await this.ionSlides.isEnd();
    }
    

  startClicked(){
    this.isBookingInfoAvailabe = false;
    this.showQuestions();
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

}
