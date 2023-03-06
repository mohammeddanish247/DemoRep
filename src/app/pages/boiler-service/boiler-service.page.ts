import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boiler-service',
  templateUrl: './boiler-service.page.html',
  styleUrls: ['./boiler-service.page.scss'],
})
export class BoilerServicePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    console.log(this.router.url);
  }

}
