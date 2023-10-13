import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-viwer',
  templateUrl: './image-viwer.component.html',
  styleUrls: ['./image-viwer.component.scss'],
})
export class ImageViwerComponent {
  @Input() src!: Array<string> | string;

  onCallParent(arg: string) {
    if (arg === 'dragstart') console.log('arrastando');
    else console.log('bobo');
  }
}
