import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageViewerComponent } from "./image-viewer/image-viewer.component";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { FullscreenImageComponent } from "./fullscreen-image/fullscreen-image.component";
@NgModule({
  declarations: [ImageViewerComponent, FullscreenImageComponent],
  imports: [
    CommonModule,
    CdkDrag,
    MatButtonModule,
    MatIconModule,
    NgbCarouselModule,
  ],
  exports: [ImageViewerComponent, FullscreenImageComponent],
})
export class ComponentsModule {}
