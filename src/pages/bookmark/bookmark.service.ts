import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';

import { Bookmark } from './bookmark';
import { DbService } from '../../shared/db.service';
import { Verse } from '../verse/verse';

@Injectable()
export class BookmarkService {
    private storeName: string = 'bookmarks';

    constructor(private dbService: DbService) {

    }

    getAll() {
         return this.dbService.getAllItems(this.storeName);
    }

    addVerseToBookmarks(verse: Verse, verseDetail) {
        // console.log(verseDetail);
        // console.log(verse);
        //surah_aya
        let surahVerseKey = `${verseDetail.index}_${verse.index}`;
        let bookmark: Bookmark = {
            aindex: verse.aindex,
            index: verse.index,
            text: verse.text,
            sura: {
                index: verseDetail.index,
                aindex: verseDetail.aindex,
                name: verseDetail.name
            }
        };
        return this.dbService.setItem(this.storeName, surahVerseKey, bookmark);
    }
}