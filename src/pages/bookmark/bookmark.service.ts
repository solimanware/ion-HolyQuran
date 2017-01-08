import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';

import { Bookmark, BookmarkType } from './bookmark';
import { DbService } from '../../shared/db.service';
import { Verse } from '../verse/verse';
import { SurahService } from '../surah/surah.service';
import _ from 'lodash';

@Injectable()
export class BookmarkService {
    private storeName: string = 'bookmarks';

    constructor(private dbService: DbService, private suraService: SurahService) {
    }

    getAll() {
        return this.dbService.getAllItems(this.storeName);
    }

    getAllUserBookmarks() {
        return this.getAll().then((bookmarks: Array<Object>) => {
            bookmarks = _.filter(bookmarks, function (bm: Bookmark) {
                return bm.type === BookmarkType.User;
            });
            return bookmarks;
        });
    }

    getAllApplicationBookmarks() {
        return this.getAll().then((bookmarks: Array<Object>) => {
            bookmarks = _.filter(bookmarks, function (bm: Bookmark) {
                return bm.type === BookmarkType.Application;
            });
            return bookmarks;
        });
    }

    addOrUpdateApplicationBookmark() {
        this.getAllApplicationBookmarks().then((bookmarks: Array<Bookmark>) => {
            for(let bookmark of bookmarks){
                
            }
        });
    }

    addVerseToBookmarks(verse: Verse, verseDetail, type?: BookmarkType) {
        // console.log(verseDetail);
        // console.log(verse);
        //get sura 
        let bookmarkPromise = this.suraService.getById(verseDetail.index).then(sura => {
            //surah_aya
            let surahVerseKey = `${sura.index}_${verse.index}`;
            let bookmark: Bookmark = {
                aindex: verse.aindex,
                index: verse.index,
                text: verse.text,
                type: type != null ? type : BookmarkType.User,
                sura: sura
            };
            return this.dbService.setItem(this.storeName, surahVerseKey, bookmark);
        });
        return bookmarkPromise;
    }

    removeBookmark() {
        
    }
}