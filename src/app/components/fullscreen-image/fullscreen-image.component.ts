import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ElementRef, Input, QueryList, ViewChild } from "@angular/core";
import { FullscreenService } from "src/app/components/fullscreen-image/fullscreen.service";

@Component({
  selector: "app-fullscreen-image",
  templateUrl: "./fullscreen-image.component.html",
  styleUrls: ["./fullscreen-image.component.scss"],
})
export class FullscreenImageComponent implements OnInit, AfterViewInit {
  public active: boolean = false;
  public src!: String;
  rotation: number = 0;

  constructor(private fullScreenService: FullscreenService) {}
  ngOnInit(): void {
    this.fullScreenService.fullScreenImage.subscribe((img) => {
      this.src = img;
    });
    this.fullScreenService.activateFullScreen.subscribe((str) => {
      this.active = str !== "inactive" ? true : false;
      this.resetImagePosition()
    });
  }

  ngAfterViewInit(): void {
    this.resetImagePosition()
  }

  imageZoom: number = 1;
  positionChanged: boolean = false;
  dragPosition = { x: 0, y: 0 };
  currentSlide: number = 0;

  @ViewChild("currentImage") currentImage!: ElementRef;

  zoomIn() {
    this.positionChanged = true;
    this.imageZoom += 0.25;
    this.currentImage.nativeElement.style.scale = this.imageZoom;
  }
  zoomOut() {
    this.positionChanged = true;
    if (this.imageZoom > 0.25) this.imageZoom -= 0.25;
    this.currentImage.nativeElement.style.scale = this.imageZoom;
  }

  resetImagePosition() {
    this.dragPosition = { x: 0, y: 0 };
    this.positionChanged = false;
    this.rotation = 0;
    this.currentImage.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
    this.imageZoom = 1;
    this.currentImage.nativeElement.style.scale = this.imageZoom;
  }

  closeFullScreenMode() {
    this.fullScreenService.closeFullScreenMode();
  }

  rotateLeft() {
    this.positionChanged = true;
    this.rotation -= 90;
    this.currentImage.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
  }

  rotateRight() {
    this.positionChanged = true;
    this.rotation += 90;
    this.currentImage.nativeElement.style.transform = `rotate(${this.rotation}deg)`;
  }

  OnDragStart() {
    this.positionChanged = true;
  }

  onScroll(event: any) {
    event.preventDefault();
    if (event.wheelDelta > 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }
}
