import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';
import { Juz } from './juz';
import { JuzService } from './juz.service';

@Component({
    selector: 'page-juz',
    templateUrl: 'juz.html'
})
export class JuzPage {
    public juzs: Array<Juz> = [];

    constructor(private navCtrl: NavController, private juzService: JuzService) {

    }

    ionViewWillEnter() {
        this.juzService.getAll().then((juzs: Array<Juz>) => {
            console.log(juzs);
            this.juzs = juzs;
        });
    }
    goToVerses(juz: Juz) {
        // let params: VerseParams = {
        //     suraIndex: sura.index,
        //     suraName : sura.name
        // };

        // this.navCtrl.push(VersePage, params);
    }
}