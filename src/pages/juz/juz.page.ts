import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';

@Component({
    selector: 'page-juz',
    templateUrl: 'juz.html'
})
export class JuzPage {
    public juzs: Array<Object> = [];

    constructor(private navCtrl: NavController) {
        // surahService.getAll().then((surahs: any) => {
        //     console.log(surahs);
        //     this.juzs = surahs;
        // });
    }

    goToVerses(juz) {
        // let params: VerseParams = {
        //     suraIndex: sura.index,
        //     suraName : sura.name
        // };

        // this.navCtrl.push(VersePage, params);
    }
}