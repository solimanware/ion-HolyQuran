import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Choose</ion-list-header>
      <button ion-item (click)="close()">Bookmarks</button>
    </ion-list>
  `
})
export class MoreOptionsPopoverPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}