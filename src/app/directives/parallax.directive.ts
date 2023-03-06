import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements OnInit{
  header: any;
  headerHeight: number;
  moveImage: number;
  scaleImage: number;

  constructor(public element: ElementRef,
    public renderer: Renderer2,
    private domCtrl: DomController,
    ) { }


  ngOnInit() { 
    setTimeout(() => {
      let content = this.element.nativeElement;
      this.header = content.getElementsByClassName('top-cover')[0];
      this.domCtrl.read(()=>{
        this.headerHeight = this.header.clientHeight;
        console.log(this.headerHeight);
        
      })
    }, 300);
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event) {
    const scrollTop = $event.detail.scrollTop;
    this.domCtrl.write(()=>{
      if(scrollTop > 0){
        this.moveImage = scrollTop/2;
        this.scaleImage = 1;

      }else{
        this.moveImage =   scrollTop / 1.4;
        this.scaleImage = -scrollTop / this.headerHeight + 1;
      }
      this.renderer.setStyle(this.header, 'webkitTransform',
      'translate3d(0,'+this.moveImage+'px,0) scale('+this.scaleImage+ ','+this.scaleImage+')'
      );
    });
  }

  
}
