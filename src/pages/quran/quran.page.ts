import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VerseService } from './verse.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Verse, VerseParams } from './verse';
import { MoreOptionsPopoverPage } from './more-options-popover.page';
import { BookmarkPage } from '../bookmark/bookmark.page';
import { SurahPage } from '../surah/surah.page';


@Component({
    selector: 'page-quran',
    templateUrl: 'quran.html'
})
export class QuranPage {
    tabSura: any;
    tabBookmark: any;

    constructor() {
        this.tabSura = SurahPage;
        this.tabBookmark = BookmarkPage;
    }
}