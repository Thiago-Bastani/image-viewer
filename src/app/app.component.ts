import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  img!: String[];

  constructor() {
    this.img = new Array<String>();
    for (let i = 0; i < 10; i++) {
      let src = `https://picsum.photos/2000?x=${i}`;
      this.img.push(src);
    }
  }
}
