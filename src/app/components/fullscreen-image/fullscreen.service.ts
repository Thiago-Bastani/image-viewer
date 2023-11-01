import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FullscreenService {
  /***
   * Event emitter
   */
  activateFullScreen = new EventEmitter<string>();
  fullScreenImage = new EventEmitter<string>();

  openFullScreenMode(src: string, page?: string) {
    this.fullScreenImage.emit(src);
    this.activateFullScreen.emit(page ?? "active");
  }

  closeFullScreenMode() {
    this.activateFullScreen.emit("inactive");
  }
}
