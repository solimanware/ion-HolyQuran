import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { VerseService } from './verse.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Verse, VerseParams } from './verse';
import { MoreOptionsPopoverPage } from './more-options-popover.page';
import { BookmarkPage } from '../bookmark/bookmark.page';
import { SurahPage } from '../surah/surah.page';
import { JuzPage } from '../juz/juz.page';


@Component({
    selector: 'page-quran',
    templateUrl: 'quran.html'
})
export class QuranPage {
    tabSura: any;
    tabJuz: any;
    tabBookmark: any;

    constructor() {
        this.tabSura = SurahPage;
        this.tabJuz = JuzPage;
        this.tabBookmark = BookmarkPage;
    }
}