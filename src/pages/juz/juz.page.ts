import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';
import { JuzService } from './juz.service';

@Component({
    selector: 'page-juz',
    templateUrl: 'juz.html'
})
export class JuzPage {
    public juzs: Array<Object> = [];

    constructor(private navCtrl: NavController, private juzService: JuzService) {

    }

    ionViewWillEnter() {
        this.juzService.getAll().then((juzs: any) => {
            console.log(juzs);
            this.juzs = juzs;
        });
    }
    goToVerses(juz) {
        // let params: VerseParams = {
        //     suraIndex: sura.index,
        //     suraName : sura.name
        // };

        // this.navCtrl.push(VersePage, params);
    }
}