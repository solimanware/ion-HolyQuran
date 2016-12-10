import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SurahService } from './surah.service';
import { VersePage } from '../verse/verse.page';

@Component({
    selector: 'page-surah',
    templateUrl: 'surah.html'
})
export class SurahPage {
    public surahs: Array<Object> = [];

    constructor(private navCtrl: NavController, private surahService: SurahService) {
        surahService.getAll().then((surahs: any) => {
            console.log(surahs);
            this.surahs = surahs;
        });
     }

     goToVerses (surah) {
         this.navCtrl.push(VersePage, surah);
     }
}