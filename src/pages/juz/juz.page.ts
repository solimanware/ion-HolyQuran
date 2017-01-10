import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';
import { Juz } from './juz';
import { JuzService } from './juz.service';
import { SurahService } from '../surah/surah.service';
import { Sura } from '../surah/sura';

@Component({
    selector: 'page-juz',
    templateUrl: 'juz.html'
})
export class JuzPage {
    public juzs: Array<Juz> = [];

    constructor(private navCtrl: NavController,
        private juzService: JuzService, private suraService: SurahService) {

    }

    ionViewWillEnter() {
        this.juzService.getAll().then((juzs: Array<Juz>) => {
            console.log(juzs);
            this.juzs = juzs;
        });
    }

    goToVerses(juz: Juz) {
        this.suraService.getById(juz.sura).then((sura: Sura) => {
            let params: VerseParams = {
                suraIndex: parseInt(juz.sura),
                verseIndex: parseInt(juz.aya),
                suraName: sura.name
            };
            this.navCtrl.push(VersePage, params);
        });
    }
}