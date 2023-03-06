import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swiper, { SwiperOptions, Pagination, Autoplay, EffectFade} from 'swiper';
import { StatusBar, Style } from '@capacitor/status-bar';
import { ApiService } from 'src/app/services/api.service';
import { SwiperComponent } from 'swiper/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsPage implements OnInit, AfterViewInit{
  productData: any;
  @ViewChild('SwiperComponent') SwiperComponent: SwiperComponent;
  swiperConfig : SwiperOptions = {
    pagination : true,
    effect : 'fade',
    autoplay : {
      delay: 1000
    },
    slidesPerView: 1,
    spaceBetween: 30,
  }

  constructor(private router: Router,
    private http : HttpClient,
    private auth : ApiService,
    private iab : InAppBrowser
    //  private stripe: Stripe
     ) { 
    this.productData =  this.router.getCurrentNavigation().extras.state;
    console.log(this.productData);
  }

  ngAfterViewInit(): void {
    // this.SwiperComponent.swiperRef.autoplay.running =true ;
  }

  ngOnInit() {
    Swiper.use([Pagination,Autoplay, EffectFade]);
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    StatusBar.setStyle({style : Style.Dark});
    
  }

  onClick(){
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    this.iab.create('https://247homerescue.co.uk/terms-conditions','',{
      hideurlbar : 'yes',
      zoom : 'no',
      fullscreen :'yes',
      toolbarcolor : '#dd2127',
    });
  }

}
