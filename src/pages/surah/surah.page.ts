import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SurahService } from './surah.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark } from '../bookmark/bookmark';
import { Sura } from './sura';
import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';

@Component({
    selector: 'page-surah',
    templateUrl: 'surah.html'
})
export class SurahPage {
    public surahs: Array<Sura> = [];

    constructor(private navCtrl: NavController,
        private surahService: SurahService, private bookmarkService: BookmarkService) {
    }

    ionViewWillEnter() {
        this.surahService.getAll().then((surahs: Array<Sura>) => {
            this.surahs = surahs;
        });
            // .then(() => {
            //     this.bookmarkService.getAllApplicationBookmarks()
            //         .then((bookmarks: Array<Bookmark>) => {
            //             if(bookmarks.length > 0){
            //                 let bookmark = bookmarks[0];
            //             }
            //         });
            // });
    }

    goToVerses(sura: Sura) {
        let params: VerseParams = {
            suraIndex: sura.index,
            suraName: sura.name
        };

        this.navCtrl.push(VersePage, params);
    }
}