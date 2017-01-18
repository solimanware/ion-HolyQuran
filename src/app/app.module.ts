import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { QuranPage, SurahPage, VersePage, MoreOptionsPopoverPage, BookmarkPage, JuzPage, SettingPage } from '../pages/shared';
import { DbService, QuranService, HelperService, EventPublisher, SchemaService } from '../shared/shared';
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
    JuzPage,
    SettingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
        tabsHideOnSubPages: true
      }
    )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuranPage,
    SurahPage,
    VersePage,
    MoreOptionsPopoverPage,
    BookmarkPage,
    JuzPage,
    SettingPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HelperService, DbService, QuranService, EventPublisher, SchemaService, BookmarkService, SurahService, VerseService, JuzService
  ]
})
export class AppModule { }
