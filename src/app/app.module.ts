import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { QuranPage, SurahPage, VersePage, MoreOptionsPopoverPage, BookmarkPage, JuzPage } from '../pages/shared';
import { DbService, QuranService } from '../shared/shared';
import { SurahService } from '../pages/surah/surah.service';
import { VerseService } from '../pages/verse/verse.service';
import { BookmarkService } from '../pages/bookmark/bookmark.service';
import { JuzService } from '../pages/juz/juz.service';


@NgModule({
  declarations: [
    MyApp,
    QuranPage,
    SurahPage,
    VersePage,
    MoreOptionsPopoverPage,
    BookmarkPage,
    JuzPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuranPage,
    SurahPage,
    VersePage,
    MoreOptionsPopoverPage,
    BookmarkPage,
    JuzPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbService, QuranService, BookmarkService, SurahService, VerseService, JuzService
  ]
})
export class AppModule {}
