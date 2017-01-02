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
    tab1: any;
    tab2: any;

    constructor() {
        this.tab1 = BookmarkPage;
        // this.tab2 = SurahPage;
    }
}