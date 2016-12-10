import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';

import { DbService } from './db.service';
import { Verse } from '../pages/verse/verse';

@Injectable()
export class BookmarkService {
    private storeName: string = 'bookmarks';

    constructor(private dbService: DbService) {
        
    }

    addVerseToBookmarks(verse: Verse, verseDetail) {
        //surah_aya
        let surahVerseKey = `${verseDetail.index}_${verse.index}`;
        return this.dbService.setItem(this.storeName, surahVerseKey, verse);
    }
}