import { Component, Output, EventEmitter } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { EventPublisher } from '../../shared/shared';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  // @Output() fontSizeUpdated: EventEmitter<number> = new EventEmitter<number>();
  fontSize: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams
  , private eventPublisher: EventPublisher) {

  }

  onFontSizeChanged($event) {
    this.eventPublisher.fontSizeChanged(this.fontSize);
  }
}
