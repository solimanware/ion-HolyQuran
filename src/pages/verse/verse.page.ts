import { Component } from '@angular/core';
import { NavController, NavParams }  from 'ionic-angular';

import { VerseService } from './verse.service';

@Component({
    selector: 'page-verse',
    templateUrl: 'verse.html'
})
export class VersePage {
    public verseDetail: any;
    public ayas: Array<Object> = [];

    constructor(private navCtrl: NavController, private navParams: NavParams,
        private verseService: VerseService) {
     }

     ionViewWillEnter() {
        console.log(this.navParams.data);
        this.verseService.getBySurahId(this.navParams.data.index).then((verse) => {
            this.verseDetail = verse;
            this.ayas = verse.aya;
            console.log(this.ayas);
        });
     }

     bookMarkVerse(verse) {
         console.log(verse);
     }

     displayVerseActionSheet(verse) {
        console.log(verse);
     }
}