import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomController, IonFabButton, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import Swiper, { SwiperOptions, Pagination, EffectFade, Autoplay} from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit, AfterViewInit {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('content') content : any;

  flag: boolean = false;

  swiperConfig : SwiperOptions = {
    pagination : true,
    effect : 'fade',
    autoplay : {
      delay: 1000
    },
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    spaceBetween: 30,
  }

  slidesData = [
    {name : "Engineer", h : "Nationwide Coverage", img : "assets/imgs/intro1.png", p :"Our nationwide network of certified engineers are both Gas Safe and Covid Aware."},
    {name : "quality", h : " Welcome to 24|7", img : "assets/imgs/intro2.png", p :"lorem ipsum dolor sit amet consectetur adipisicing elit"},
    {name : "24-Hour Availability", h : "24-Hour Availability", img : "assets/imgs/247Service.png", p :"Our emergency helpline is always open. If you need us, just call us anytime."},
    {name : "Engineer", h : "Nationwide Coverage", img : "assets/imgs/intro1.png", p :"Our nationwide network of certified engineers are both Gas Safe and Covid Aware."},
    // {name : "Discount", h : "Get the Best Deal, Save Big.", img : "assets/imgs/intro2.png", p :"lorem ipsum dolor sit amet consectetur adipisicing elit"},
  ]
  addActiveClass: boolean;
  lastSlideIndex: number;
  
  constructor(private router: Router, private dom: DomController, private storage: Storage) { }

  ngAfterViewInit(): void {
    this.lastSlideIndex = this.swiper.slidesEl.length - 1 ;
  }

  ngOnInit() {
    Swiper.use([Pagination, EffectFade]);
    // this.lastSlideIndex = this.swiper.slidesEl.length - 1 ;
  }

  

  public goBack(){
    this.flag = false;
    this.addActiveClass= false;
    // this.slides.slidePrev();
    this.swiper.swiperRef.slidePrev(1000);
    console.log(this.flag);
  }

  public goNext(){
    if(this.flag){
      console.log('set intro key true ');
        this.storage.set('introKey',true).then(()=>{
          this.router.navigate(['login'],{replaceUrl:true});
      })
    }else{
      this.swiper.swiperRef.slideNext(1000);
      if(this.swiper.swiperRef.activeIndex == this.lastSlideIndex){
        this.flag = true;
        this.addActiveClass= true;
      }else{
        this.flag = false;
        this.addActiveClass= false;
      }

    }

  }

  public skipBtn(){
    this.router.navigate(['login'],{replaceUrl:true})
  }

}
