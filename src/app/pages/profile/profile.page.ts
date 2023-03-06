import { HttpParams } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType , CameraSource } from '@capacitor/camera';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Storage } from '@ionic/storage';
import { IUserCredential, IUserData } from 'src/app/interface/user-login';
import { ApiService } from 'src/app/services/api.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
// import SwiperCore , {
//   Pagination
// } from 'swiper';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit , AfterContentChecked{
  @ViewChild('swiper') swiper: SwiperComponent | undefined;

config:SwiperOptions={
  pagination : false
}
  userdata : any ;

  imgdata =  [{imgurl:"/assets/imgs/products/Boiler Breakdown.svg" , imgText: "Check Boiler Eligibility"},
  {imgurl:"/assets/imgs/products/Central Heating System.svg" , imgText: "My Policy"},
  {imgurl: "/assets/imgs/products/Annual Boiler Service.svg" , imgText: "Book My Boiler Service/CP12"},
  {imgurl:"/assets/imgs/products/default.svg"  , imgText: "Log a Claim"},
  {imgurl:"/assets/imgs/products/track claim.svg" , imgText: "Track Claim & Service/CP12"},
  {imgurl:"/assets/imgs/products/CP12 Certificate.svg" , imgText: "My Document"}]
  
  // policyDetails : IUserData ;
  policyDetails: any = [];

  serviceList = ["Boiler Breakdown" , "Drainage", "Annual Boiler Service", "Home Electrics", "Central Heating System", "Home Security", "Plumbing", "Pest Control"]

  marketingPreference = ["Post" , "SMS", "Mobile", "Phone","Email"]

  imageUrl : any ="";
  isdataArrived : boolean = false;
  editModeOff : boolean = true;
  editModeOn : boolean = false ;
  imagedata: any;
  productData: any;

  constructor(
    private storage : Storage, 
    private router : Router,
    private auth : ApiService,
    ) {
      console.log("in RiskAddress page");   
      StatusBar.setBackgroundColor({ color : '#dd2127'});
      StatusBar.setStyle({style : Style.Dark}); 
   }

  ngOnInit() {
    this.storage.get('user_image').then(res=>{
      this.imagedata = res;
    })
    this.storage.get("Userdata").then((res: any)=>{
      this.userdata = res ;
      this.policyDetails.push(res);
      this.auth.getPolicyDetails(res.GroupID).subscribe(res=>{
        this.userdata = Object.assign(this.userdata , res);
        console.log("Danish ");
        console.log(this.userdata);
        setTimeout(() => {
          this.isdataArrived = true;
        }, 500);      
      })
    }).catch(err=>{
      console.log("error :"+err);
    })

  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source : CameraSource.Prompt

    });
    this.imageUrl = `data:image/jpeg;base64,${image.base64String}`;
    console.log("image data"+this.imageUrl);
  };

  prev(){
    this.swiper?.swiperRef.slidePrev(500);
  }

  next(){
    this.swiper?.swiperRef.slideNext(500);
  }



  ngAfterContentChecked() {
      if(this.swiper){
        this.swiper.updateSwiper({});
      }
  }

  onImgError(event){
    console.log(event);
    event.target.src = '../../../assets/imgs/profile.png';
  }

  getImage(item){
    switch (item) {
      case "Mobile" :
         return this.userdata.Market_Mobile == true ? "/assets/imgs/products/correct.svg" :  "/assets/imgs/products/wrong.svg" ;
      case "Email": 
        return this.userdata.Market_Email == true ? "/assets/imgs/products/correct.svg" :  "/assets/imgs/products/wrong.svg" ;
      case  "SMS":
        return this.userdata.Market_SMS == true ? "/assets/imgs/products/correct.svg" :  "/assets/imgs/products/wrong.svg" ;
      case "Post":
        return this.userdata.Market_Post == true ? "/assets/imgs/products/correct.svg" :  "/assets/imgs/products/wrong.svg" ;
      case "Phone":
          return this.userdata.Market_Phone == true ? "/assets/imgs/products/correct.svg" :  "/assets/imgs/products/wrong.svg" ;
    }
  }


  cardClick(c){
    const a = c.imgText;
    console.log(a);
    
    switch (a) {
      case "Check Boiler Eligibility":
        
      break;
      case "My Policy":
      
      break;
      case "Book My Boiler Service/CP12":
        this.router.navigate(['book-service'],{
          state : this.userdata
        })
      break;
      case "Log a Claim":
        this.router.navigate(['log-claim'],{
          // state : page
        })
      break;
      case "Track Claim & Service/CP12":
        this.router.navigate(['track-services-details'],{
          // state : page
        })
      break;
      case "My Document":
        this.router.navigate(['documents'],{
          // state : page
        })
        break;
    
      default:
        break;
    }
    // let page : any = a[0];
    // if (page) {
    //   if (page.productValue || page.path == 'eligibility' || page.path == 'log-claim' || page.path == 'track-claim') {
    //     this.router.navigate(['risk-addresses'],{
    //       state : page
    //     })
    //   } else {
    //       this.router.navigate([`${page.path}`],{
    //         state : page
    //       })
    //   }
    // }
  }

}
