import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, MenuController, NavController, ScrollCustomEvent, ViewWillEnter } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { IUserData } from 'src/app/interface/user-login';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { YoutubeVideoPlayer } from '@awesome-cordova-plugins/youtube-video-player/ngx';
import Swiper, {SwiperOptions, Pagination, Autoplay, EffectFade} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Network } from '@awesome-cordova-plugins/network/ngx';
Swiper.use([Autoplay, Pagination]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {


  @ViewChild('ionContent', { static: false }) content: IonContent;
  @ViewChild('contentEl') contentEl: ElementRef;
  @ViewChild('SwiperComponent') SwiperComponent: SwiperComponent;
  @ViewChild('firstHeaderWrapper') firstHeaderWrapper : ElementRef;
  @ViewChild('topSection') topSection : ElementRef;
  @ViewChild('bottomSection') bottomSection : ElementRef; 
  @ViewChild('toolbar') toolbar : ElementRef;
  
  
  topSectionHeight: any;
  autoScrollUp: boolean = true;
  autoScrollDown: boolean;
  topSectionAndToolbarHeight: any;


  // swiperConfig: SwiperOptions = {
  //     speed : 1000,
  //     loop : true,
  //     slidesPerView : 1,
  //     spaceBetween : 0,
  //     centeredSlides : true,
  //     pagination : true,
  //     effect : 'fade',
  //     autoplay : {
  //       delay: 5000,
  //     },
      // fadeEffect: {
      //   crossFade: true
      // },
  // };

  swiperConfig : SwiperOptions = {
    pagination : true,
    loop : true,
    speed : 1000,
    // effect : 'fade',
    autoplay : {
      delay: 5000
    },
    slidesPerView: 1,
    spaceBetween: 30,
    // fadeEffect: {
    //   crossFade: true
    // },
  }

  promo: SwiperOptions = {
    modules: [Autoplay],
    autoplay : {
      delay : 3000,
      disableOnInteraction : false,
    },
      speed : 1000,
      loop : true,
      slidesPerView : 1,
      centeredSlides : true,
  };

  config2: SwiperOptions = {
    slidesPerView : 2.4,
    spaceBetween : 20,
    breakpoints : {
      480: {
        slidesPerView: 3.5,
      },
      768: {
        slidesPerView: 3.2,
        spaceBetween : 30,
      },
      1024: {
        slidesPerView: 4.2,
        spaceBetween : 40,
      },
    }
};


  UserData: IUserData;

  promoSlide = [
    {src: 'assets/imgs/post1.png'},
    {src: 'assets/imgs/post2.jpg'},
    {src: 'assets/imgs/third.jpg'},
    {src: 'assets/imgs/fourth.jpg'}
  ]

  // heroSlide = [
  //   {id : "1", img : "assets/imgs/hero1.png", h:" Increase Boiler Efficiency, ", p : " say goodbye to unnecessary fuel wastage and save money by buying highly efficient Gas-boilers from us. ", button : "More Info",  btnLink:"https://find-a-boiler.247homerescue.co.uk"},
  //   {id : "1", img : "assets/imgs/hero2.png", h:" Save upto 30%* off Boiler Covers, ", p : " Get your boiler covered today and avail up to a 30%* discount. Don't miss out on this amazing offer! Valid for a limited time-period. ", button : "More Info", btnLink:"https://247homerescue.co.uk/boiler-cover/"},
  // ]

  // cardData = [
  //   {name : "Boilers Service", img : "assets/imgs/a.jpg", path : "boiler-service", productValue: 1},
  //   {name : "Appliance Service", img : "assets/imgs/b.jpg", path : "appliance" , productValue: 2},
  //   {name : "Home Emergency", img : "assets/imgs/h.jpg", path : "home-emergency", productValue: 3},
  //   // {name : "Carlo & Car Service", img : "assets/imgs/a.jpg", path : "car", productValue: null},
  //   {name : "Track My Jobs", img : "assets/imgs/a.jpg", path : "track-claim", productValue: null},
  //   {name : "Log a Claim", img : "assets/imgs/a.jpg", path : "log-claim", productValue: null},
  //   {name : "Eligibility", img : "assets/imgs/eligibility.png", path : "eligibility", productValue: null},
  //   {name : "Documents", img : "assets/imgs/documents.png", path : "documents", productValue: null},
  // ]

  cardData = [
    {name : "Boilers Service", img : "assets/imgs/boiler-card.png", path : "boiler-service", productValue: 1},
    {name : "Appliance Service", img : "assets/imgs/appliance-card.png", path : "appliance" , productValue: 2},
    {name : "Home Emergency", img : "assets/imgs/home.png", path : "home-emergency", productValue: 3},
    {name : "Track My Jobs", img : "assets/imgs/track-my-jobs.png", path : "track-claim", productValue: null},
    {name : "Log a Claim", img : "assets/imgs/log-a-claim-card.png", path : "log-claim", productValue: null},
    {name : "Carlo & Car Service", img : "assets/imgs/carlo.png", path : "car-service", productValue: null},
    {name : "Eligibility", img : "assets/imgs/eligibility.png", path : "eligibility", productValue: null},
    {name : "Documents", img : "assets/imgs/documents.png", path : "documents", productValue: null},
  ]

  partners =[
    {img : "assets/imgs/Groupon.webp"},
    {img : "assets/imgs/living-social.webp"},
    {img : "assets/imgs/MSM.webp"},
    {img : "assets/imgs/Quidco.webp"},
    {img : "assets/imgs/TC.webp"},
    {img : "assets/imgs/GoCompare.webp"},
  ]
  classApplied: boolean = false;
  heroSlide: any[] = [];

  constructor(private router : Router,
    private menu : MenuController,
    private iab: InAppBrowser,
    private youtube: YoutubeVideoPlayer,
    public renderer :  Renderer2,
    private network: Network,
    private navCtrl: NavController,
    private animationCtrl : AnimationController,
    public activeRoute : ActivatedRoute) {
      this.activeRoute.params.subscribe(res=>{
        StatusBar.setBackgroundColor({ color : '#ffdddd'});
        StatusBar.setStyle({style : Style.Light});
      });
  }

    

  @HostListener('ionScroll',['$event']) onContentScroll($event) {
    let scrollTop = $event.detail.scrollTop;
    // console.log(scrollTop);
    const animation = this.animationCtrl.create()
    .addElement(this.toolbar.nativeElement)
    .duration(400)
    .fromTo('opacity', 0,1);
    if(scrollTop> this.topSectionHeight){
      animation.play();
      // console.log(this.toolbar.nativeElement);
      this.renderer.setStyle(this.firstHeaderWrapper.nativeElement,'backgroundColor','#ffdddd')
    }else{
      this.renderer.removeStyle(this.firstHeaderWrapper.nativeElement,'backgroundColor')
    }
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    StatusBar.setBackgroundColor({ color : '#ffdddd'});
    StatusBar.setStyle({style : Style.Light});
    StatusBar.show();
    setTimeout(() => {
      this.SwiperComponent.swiperRef.autoplay.running =true ;
      console.log(this.topSection.nativeElement.offsetHeight);
      this.topSectionHeight = this.topSection.nativeElement.offsetHeight;
      let topSectionHeight = this.topSection.nativeElement.offsetHeight + 50;
      let topSectionHeightpx = JSON.stringify(topSectionHeight)+"px";
      console.log(topSectionHeightpx);
      this.renderer.setStyle(this.bottomSection.nativeElement,'top', topSectionHeightpx)      
    }, 500);
      
  }

  onLogoClick(){

  }

  async ionScrolling(event){
    const scrollElement = await event.target.getScrollElement();
  }

  
  ngOnInit() {
    Swiper.use([Pagination,Autoplay, EffectFade]);
    this.subscribeNetworkStatus();
    console.log("ngOnInit");
    console.log(this.heroSlide.length);
          this.heroSlide = [
            {id : "1", img : "assets/imgs/hero3.png", h:"Save upto 30%* off Boiler Covers,", p : "Get your boiler covered today and avail up to a 30%* discount. Don't miss out on this amazing offer!", button : "More Info", btnLink:"https://247homerescue.co.uk/boiler-cover/"},
            {id : "1", img : "assets/imgs/hero1.png", h:"Increase Boiler Efficiency,", p : "say goodbye to un necessary fuel wastage and save money by buying highly efficient Gas-boilers from us.", button : "More Info",  btnLink:"https://find-a-boiler.247homerescue.co.uk"},            
            {id : "1", img : "assets/imgs/hero4.png", h:" Save upto 30%* off Boiler Covers, ", p : " Get your boiler covered today and avail up to a 30%* discount. Don't miss out on this amazing offer!", button : "Know More",  btnLink:"https://find-a-boiler.247homerescue.co.uk"},
          ]
  }

  subscribeNetworkStatus() {
    let subscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.router.navigate(['no-internet']);
    });
    // if (this.network.type=='none' || this.network.type==null) {
    //   this.router.navigate(['no-internet']);
    // }
  }

  serviceClick(pageData){
    let a = this.cardData.filter( (el)=>{
      return el.name == pageData.name;
    });
    let page : any = a[0];
    if (page) {
      if (page.productValue || page.path == 'eligibility' || page.path == 'log-claim' || page.path == 'track-claim') {
        this.router.navigate(['risk-addresses'],{
          state : page
        })
      } else {
          this.router.navigate([`${page.path}`],{
            state : page
          })
      }
    }
  }

  toggle(){
    this.classApplied = !this.classApplied;
    console.log(this.classApplied);
    
  }

  ionWillOpen(){
    console.log("afdasdfsadfsdafsaf sdfsafsadf");
    
  }

  watchClicked(){
    this.youtube.openVideo('kb4rFMXXgOY');
    this.iab.create("https://www.youtube.com/watch?v=kb4rFMXXgOY","",{
      fullscreen :'yes',

    })
  }

  heroBtnClick(link :string){
    StatusBar.setBackgroundColor({ color : '#dd2127'});
    StatusBar.setStyle({style : Style.Dark}); 
    this.iab.create(link,'_self',{
      fullscreen :'yes',
      toolbarcolor : '#dd2127',
      hideurlbar : 'yes'
    })
  }

  scrollIt(){
    console.log('please scroll it');
  }



}
