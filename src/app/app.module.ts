import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SurahPage } from '../pages/surah/surah';
import { DbService, QuranService } from '../shared/shared';


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SurahPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    SurahPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbService, QuranService
  ]
})
export class AppModule {}
