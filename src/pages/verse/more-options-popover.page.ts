import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

import { BookmarkPage } from '../bookmark/bookmark.page';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Choose</ion-list-header>
      <button ion-item (click)="goToPageBookmark()">Bookmarks</button>
    </ion-list>
  `
})
export class MoreOptionsPopoverPage {
  constructor(public viewCtrl: ViewController, private navCtrl: NavController) {}

  goToPageBookmark() {
    this.viewCtrl.dismiss();
    this.navCtrl.push(BookmarkPage);
  }
}