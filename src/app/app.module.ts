import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageViwerComponent } from './image-viwer/image-viwer.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, ImageViwerComponent],
  imports: [BrowserModule, CdkDrag],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
