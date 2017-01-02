import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BookmarkService } from './bookmark.service';
import { Bookmark } from './bookmark';
import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';

@Component({
    selector: 'page-bookmark',
    templateUrl: 'bookmark.html'
})
export class BookmarkPage implements OnInit {
    public bookmarks: Array<Bookmark> = [];

    constructor(private navCtrl: NavController, private bookmarkService: BookmarkService) {

    }
    ngOnInit() {
        this.ionViewWillEnter();
    }
    ionViewWillEnter() {
        this.bookmarkService.getAll().then((bookmarks: any) => {
            console.log('bookmarks');
            console.log(bookmarks);
            this.bookmarks = bookmarks;
        });
     }

     goToVerse(bookmark) {
        let params: VerseParams = {
            suraIndex: bookmark.sura.index,
            suraName : bookmark.sura.name,
            verseIndex : bookmark.index
        };
        
        this.navCtrl.push(VersePage, params);
     }
}
