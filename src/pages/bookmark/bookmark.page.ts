import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BookmarkService } from './bookmark.service';
import { Bookmark } from './bookmark';

@Component({
    selector: 'page-bookmark',
    templateUrl: 'bookmark.html'
})
export class BookmarkPage {
    public bookmarks: Array<Bookmark> = [];

    constructor(private navCtrl: NavController, private bookmarkService: BookmarkService) {
        bookmarkService.getAll().then((bookmarks: any) => {
            console.log(bookmarks);
            this.bookmarks = bookmarks;
        });
     }

    
}
