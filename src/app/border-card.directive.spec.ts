

import { BorderCardDirective } from './pokemon/border-card.directive';
import { ElementRef } from '@angular/core';

describe('BorderCardDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {
      nativeElement: document.createElement('div') // Mocking nativeElement
    } as ElementRef;

    const directive = new BorderCardDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
