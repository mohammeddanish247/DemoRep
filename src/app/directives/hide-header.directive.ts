import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {

  @Input('appHideHeader') toolbar : any;
  private toolbarHeight = 44;
  constructor(private renderer : Renderer2, private domCtrl : DomController) { }

  ngOnInit() {
    setTimeout(() => {
      this.toolbar = this.toolbar.el;
      this.domCtrl.read(()=>{
       this.toolbarHeight = this.toolbar.clientHeight;
      });
    }, 100);
  }

  @HostListener('ionScroll',['$event']) onContentScroll($event) {
     
    const scrollTop = $event.detail.scrollTop;

    let newPos = - (scrollTop / 5); 
    if(newPos < -this.toolbarHeight){
      newPos = -this.toolbarHeight;
    }

    let newOpacity = 1 - (newPos/-this.toolbarHeight);

    this.domCtrl.write(()=>{
      this.renderer.setStyle(this.toolbar, 'top', `${newPos}px`);
      this.renderer.setStyle(this.toolbar, 'opacity', newOpacity);
    });
  }


}
