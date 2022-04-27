import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLeftBorderColor]'
})
export class LeftBorderColorDirective {
  constructor(private element: ElementRef, private renderer2: Renderer2) { 
    const borderColor = Math.floor(Math.random() * 16777215).toString(16);
    this.renderer2.setStyle(this.element.nativeElement, 'border-left-color', `#${borderColor}`);
  }
}
