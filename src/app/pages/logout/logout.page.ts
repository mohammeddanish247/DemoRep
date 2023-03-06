import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private api : ApiService, private router : Router) { }

  ngOnInit() {
  }

  logout(){
    console.log("inside logout");    
    this.api.logout();
  }
}
