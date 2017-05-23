import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[autofocuser]' 
})
export class Autofocuser {

  constructor(
  	private element: ElementRef,
  	private renderer: Renderer
  ) {}

  ngAfterViewInit() {
    let nativeElement = this.element.nativeElement.children[0]

    this.renderer.listen(nativeElement, "blur", () => {
    	console.log('se fue');
    	this.renderer.invokeElementMethod(nativeElement, 'focus', []);
    })
  }

}