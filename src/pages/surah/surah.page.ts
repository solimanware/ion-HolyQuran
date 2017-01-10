import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SurahService } from './surah.service';
import { Sura } from './sura';
import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';

@Component({
    selector: 'page-surah',
    templateUrl: 'surah.html'
})
export class SurahPage {
    public surahs: Array<Sura> = [];

    constructor(private navCtrl: NavController, private surahService: SurahService) {
    }

    ionViewWillEnter() {
        this.surahService.getAll().then((surahs: Array<Sura>) => {
            this.surahs = surahs;
        });
    }

    goToVerses(sura: Sura) {
        let params: VerseParams = {
            suraIndex: sura.index,
            suraName: sura.name
        };

        this.navCtrl.push(VersePage, params);
    }
}