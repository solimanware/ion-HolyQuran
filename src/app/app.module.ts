import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { QuranPage, SuraPage, VersePage, MoreOptionsPopoverPage, BookmarkPage, JuzPage, SettingPage } from '../pages/shared';
import { DbService, QuranService, HelperService, EventPublisher, SchemaService, MetaDataService } from '../shared/shared';
import { SuraService } from '../pages/sura/sura.service';
import { VerseService } from '../pages/verse/verse.service';
import { BookmarkService } from '../pages/bookmark/bookmark.service';
import { JuzService } from '../pages/juz/juz.service';
import { SettingService } from '../pages/setting/setting.service';


@NgModule({
  declarations: [
    MyApp,
    QuranPage,
    SuraPage,
    VersePage,
    MoreOptionsPopoverPage,
    BookmarkPage,
    JuzPage,
    SettingPage
  ],
  imports: [
    BrowserModule, 
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true 
    }
    )],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QuranPage,
    SuraPage,
    VersePage,
    MoreOptionsPopoverPage,
    BookmarkPage,
    JuzPage,
    SettingPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HelperService, DbService, QuranService, EventPublisher, SchemaService, MetaDataService
    , BookmarkService, SuraService, VerseService, JuzService, SettingService
  ]
})
export class AppModule { }
