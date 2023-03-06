import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-track-services-details',
  templateUrl: './track-services-details.page.html',
  styleUrls: ['./track-services-details.page.scss'],
})
export class TrackServicesDetailsPage implements OnInit {

  productData = {
    name: "Track Services",
    path: "track-services-details",
    productValue: null
  }



  constructor() {

   }

  ngOnInit() {
    // this.intrv = interval(700).subscribe(res=>{
    //   this.nextStep();
    // })
}

currentStep = 1;
numSteps = 6;
intrv : Subscription;

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

}
