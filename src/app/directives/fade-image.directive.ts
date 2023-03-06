import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appFadeImage]'
})
export class FadeImageDirective {

  @Input('appFadeImage') topimage : any;
  @Input('appFadeHeader') toolbar : any;


  constructor(private domCtrl : DomController, private router:Router) { }

  ngOnInit() {
   
    // setTimeout(() => {       
    //   this.toolbar = this.toolbar.el;
    //   let urlText = this.router.url.replace("/","").toUpperCase();
    //   this.topimage.el.children[1].innerText = urlText;
    // }, 100);
  }

  @HostListener('ionScroll',['$event']) onContentScroll($event) {
     
    let scrollTop = $event.detail.scrollTop;
    scrollTop = parseInt(scrollTop);
    if(scrollTop >= 255){
      scrollTop = 255;      
    }
    let normalizedVlaue = ((scrollTop*1)/255);
    normalizedVlaue = 1-normalizedVlaue;   
    let hexDist = scrollTop.toString(16);
    
    // this.domCtrl.write(()=>{
    //   this.topimage.el.style.setProperty('opacity', normalizedVlaue)
    // })
    
  }

}
