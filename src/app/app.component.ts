import { Component, ViewChild, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { SurahPage, BookmarkPage, QuranPage, SettingPage } from '../pages/shared';
import { QuranService, EventPublisher } from '../shared/shared';

@Component({
  selector: 'body',
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  @HostBinding('style.fontSize') fontSize = '14px';
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  subscription: Subscription;

  constructor(public platform: Platform
    , private quranService: QuranService, private eventPublisher: EventPublisher) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Bookmark', component: BookmarkPage },
      { title: 'Surah', component: SurahPage },
      { title: 'Settings', component: SettingPage }
    ];

    this.subscription = eventPublisher.fontSizeChanged$.subscribe(
      fontSize => {
        console.log(fontSize);
        this.fontSize = fontSize + 'px';
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      this.quranService.syncData(() => {
        this.rootPage = QuranPage;
        Splashscreen.hide();
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
