import { Component, Output, EventEmitter } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { SettingService } from './setting.service';
import { EventPublisher } from '../../shared/shared';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  fontSize: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private eventPublisher: EventPublisher, private settingService: SettingService) {

  }

  ionViewWillEnter() {
    //set font
    this.settingService.get('fontSize').then(fontSize => {
      if (fontSize) {
        switch (fontSize) {
          case 14:
            this.fontSize = 1;
            break;
          case 16:
            this.fontSize = 2;
            break;
          case 18:
            this.fontSize = 4;
            break;
        }
      }
    });
  }

  onFontSizeChanged($event) {
    this.eventPublisher.fontSizeChanged(this.fontSize);
  }
}
