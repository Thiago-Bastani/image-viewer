import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { NgbCarousel, NgbSlideEvent } from "@ng-bootstrap/ng-bootstrap";
import { FullscreenService } from "src/app/components/fullscreen-image/fullscreen.service";

@Component({
  selector: "app-image-viewer",
  templateUrl: "./image-viewer.component.html",
  styleUrls: ["./image-viewer.component.scss"],
})
export class ImageViewerComponent implements OnInit, OnChanges {
  @Input() src!: String | Array<String>;
  @Input() customString?: string;

  images!: Array<String>;
  imageZoom: number = 1;
  imageLoaded: boolean = false;
  positionChanged: boolean = false;
  dragPosition = { x: 0, y: 0 };
  currentSlide: number = 0;
  rotation: number = 0;

  @ViewChildren("currentImage") currentImage!: QueryList<ElementRef>;
  @ViewChild("carousel", { static: true }) carousel!: NgbCarousel;

  constructor(private fullScreenService: FullscreenService) {}

  initImages() {
    if (!(this.src instanceof Array)) {
      this.images = new Array<String>();
      this.images.push(this.src);
    } else {
      this.images = this.src;
    }
    this.carousel.pause();
  }

  ngOnInit(): void {
    this.initImages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.imageLoaded = false;
    this.initImages();
  }

  zoomIn() {
    this.positionChanged = true;
    this.imageZoom += 0.25;
    this.currentImage.map((x) => x)[
      this.currentSlide
    ].nativeElement.style.scale = this.imageZoom;
  }
  zoomOut() {
    this.positionChanged = true;
    if (this.imageZoom > 0.25) this.imageZoom -= 0.25;
    this.currentImage.map((x) => x)[
      this.currentSlide
    ].nativeElement.style.scale = this.imageZoom;
  }

  OnSlide(event: NgbSlideEvent) {
    this.resetImagePosition();
    if (event.direction === "start") this.currentSlide++;
    else this.currentSlide--;
    if (this.currentSlide > this.currentImage.length - 1) this.currentSlide = 0;
    else if (this.currentSlide < 0)
      this.currentSlide = this.currentImage.length - 1;
  }

  resetImagePosition() {
    this.dragPosition = { x: 0, y: 0 };
    this.positionChanged = false;
    this.rotation = 0;
    this.currentImage.map((x) => x)[
      this.currentSlide
    ].nativeElement.style.transform = `rotate(${this.rotation}deg)`;
    this.imageZoom = 1;
    this.currentImage.map((x) => x)[
      this.currentSlide
    ].nativeElement.style.scale = this.imageZoom;
  }

  openFullScreenMode() {
    this.fullScreenService.openFullScreenMode(
      this.currentImage.map((x) => x)[this.currentSlide].nativeElement.src,
      this.customString ?? this.customString
    );
  }

  rotateLeft() {
    this.positionChanged = true;
    this.rotation -= 90;
    this.currentImage.map((x) => x)[
      this.currentSlide
    ].nativeElement.style.transform = `rotate(${this.rotation}deg)`;
  }

  rotateRight() {
    this.positionChanged = true;
    this.rotation += 90;
    this.currentImage.map((x) => x)[
      this.currentSlide
    ].nativeElement.style.transform = `rotate(${this.rotation}deg)`;
  }

  OnDragStart() {
    this.positionChanged = true;
  }

  next() {
    this.carousel.next();
  }

  previous() {
    this.carousel.prev();
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
