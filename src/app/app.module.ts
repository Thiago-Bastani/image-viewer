import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageViwerComponent } from './image-viwer/image-viwer.component';
import { DragDirective } from './image-viwer/drag-directive/drag.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImageViwerComponent,
    DragDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
