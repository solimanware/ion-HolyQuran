import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SurahService } from './surah.service';
import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';

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

    goToVerses(sura) {
        let params: VerseParams = {
            suraIndex: sura.index,
            suraName : sura.name
        };

        this.navCtrl.push(VersePage, params);
    }
}