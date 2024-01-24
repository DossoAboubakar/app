import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective {
  constructor(private elt: ElementRef) {
    this.setHeight(180);
    this.setBorder('red');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setBorder('blue');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setBorder('red');
  }

  private setHeight(height: number) {
    this.elt.nativeElement.style.height = `${height}px`;
  }

  private setBorder(color: string) {
    let border = `solid 4px ${color}`;
    this.elt.nativeElement.style.border = border;
  }
}
