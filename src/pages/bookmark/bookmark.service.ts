import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';

import { Bookmark } from './bookmark';
import { DbService } from '../../shared/db.service';
import { Verse } from '../verse/verse';
import { SurahService } from '../surah/surah.service';

@Injectable()
export class BookmarkService {
    private storeName: string = 'bookmarks';

    constructor(private dbService: DbService, private suraService: SurahService) {
    }

    getAll() {
         return this.dbService.getAllItems(this.storeName);
    }

    addVerseToBookmarks(verse: Verse, verseDetail) {
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
                sura: sura
            };
            return this.dbService.setItem(this.storeName, surahVerseKey, bookmark);
        });
       return bookmarkPromise;
    }
}