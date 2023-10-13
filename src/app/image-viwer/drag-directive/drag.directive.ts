import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  constructor(private element: ElementRef, private rend2: Renderer2) {}

  @HostListener('dragstart', ['$event']) dragStart(evt: any) {
    evt.preventDefault();
  }

  @HostListener('dragend') dragEnd() {}
}
