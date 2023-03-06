import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LogClaimPage } from '../log-claim/log-claim.page';

@Component({
  selector: 'app-track-claim-details',
  templateUrl: './track-claim-details.page.html',
  styleUrls: ['./track-claim-details.page.scss'],
})
export class TrackClaimDetailsPage implements OnInit, AfterViewInit {

  claimdetails: any;
  customerSatisfaction: any;
  jobguid: string;
  productData: any;

  currentStep = 1;
  numSteps = 6;
  intrv : Subscription;
  obs: Observable<string>;

  constructor(
    private auth: ApiService,
    private router : Router
  ) {
    let data = this.router.getCurrentNavigation().extras.state ;
    this.claimdetails = data.claim;
    console.log(this.claimdetails);
    
    this.productData = data.pageData;
  }

  ngAfterViewInit(): void {
    let lastjob :string;
    this.obs.subscribe((res)=>{
      console.log(res);      
      this.activeicon(res)
      lastjob = res;
      console.log(lastjob);
      
    },()=>{

    },()=>{
      var step = document.getElementById(lastjob);
      let lasticon = step.children[0].children[0];
      this.addClass(lasticon, "animate__animated animate__pulse animate__infinite");
    })
  }

  ngOnInit() {
    console.log("inside ClaimDetailsPage");
    this.obs = new Observable((res)=>{
      if(this.claimdetails.JobID != null){
        // this.activeicon('claim-registered');
        // claim-registered
        setTimeout(() => {
          res.next('claim-registered')
        }, 100);
      } 
      if(this.claimdetails.EngineerName!= null){
        // this.activeicon('engineer-assigned');
        // engineer-assigned
        
        setTimeout(() => {
          res.next('engineer-assigned');
        }, 400);
      } 
      if(this.claimdetails.AppointmentDate!=-1){
        
        // this.activeicon('appointment-scheduled');
        // appointment-scheduled
        setTimeout(() => {
          res.next('appointment-scheduled');
        }, 700);
      } 
      if(this.claimdetails.EngineerOnRoute!= -1){
      
       setTimeout(() => {
        res.next('on-route');
      }, 1000);
        // on-route
      }
       if(this.claimdetails.AttendedDate!= -1){
        
        setTimeout(() => {
          res.next('on-arrived');
        }, 1300);
        // on-arrived
      }
       if(this.claimdetails.ClaimStatus=='Job Complete'){
       
        setTimeout(() => {
          res.next('completed');
        }, 1500);
        // completed
      }
      setTimeout(() => {
        res.complete();
      }, 1500);
    })
  }


  activeicon(idname: string){
    var step = document.getElementById(idname);
    // this.addClass(step, "editing");
    this.addClass(step, "done");
  }



  nextStep() {
    this.currentStep++;
    if (this.currentStep > this.numSteps) {
      this.currentStep = 1;
      this.intrv.unsubscribe();
    }
    var stepper = document.getElementById("stepper1");
    var steps = stepper.getElementsByClassName("step");

    Array.from(steps).forEach((step, index) => {
      let circle = step.children[0].children[0];
      let stepNum = index + 1;
      if (stepNum === this.currentStep) {
        this.addClass(step, "editing");
        this.addClass(circle, "animate__animated animate__pulse animate__infinite") 
      } else {
        this.removeClass(step, "editing");
        this.removeClass(circle, "animate__animated animate__pulse animate__infinite");
      }
      if (stepNum < this.currentStep) {
        this.addClass(step, "done");
      } else {
        this.removeClass(step, "done");
      }
    });
  }
  hasClass(elem, className) {
    return new RegExp(" " + className + " ").test(" " + elem.className + " ");
  }

  addClass(elem, className) {
    if (!this.hasClass(elem, className)) {
      elem.className += " " + className;
    }
  }

  removeClass(elem, className) {
    var newClass = " " + elem.className.replace(/[\t\r\n]/g, " ") + " ";
    if (this.hasClass(elem, className)) {
      while (newClass.indexOf(" " + className + " ") >= 0) {
        newClass = newClass.replace(" " + className + " ", " ");
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, "");
    }
  }

  navToLink(link) {
    window.open(`${link}`, "_system", "location=yes");
    // this.iab.create(`https://docs.google.com/viewer?url=${link}`);
  }

  getTileColor() {
    return "grey";
  }

}
