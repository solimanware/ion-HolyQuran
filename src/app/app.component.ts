import { Component, ViewChild, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SuraPage, BookmarkPage, QuranPage, SettingPage } from '../pages/shared';
import { QuranService, EventPublisher } from '../shared/shared';
import { SettingService } from '../pages/setting/setting.service';

@Component({
  selector: 'body',
  templateUrl: 'app.html',
  providers: [StatusBar, SplashScreen]
})
export class MyApp implements OnDestroy {
  private baseFontSize = 14;

  @HostBinding('style.fontSize') applicationFontSize = this.baseFontSize + 'px';
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  subscription: Subscription;
    // private loader;

  constructor(public platform: Platform, private loadingCtrl: LoadingController
    , private statusBar: StatusBar, private splashScreen: SplashScreen
    , private quranService: QuranService, private eventPublisher: EventPublisher
    , private settingService: SettingService) {
    //cache loader
    // this.loader = this.loadingCtrl.create({
    //     content: "Please wait..."
    // });
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Bookmark', component: BookmarkPage },
      { title: 'Quran', component: QuranPage },
      { title: 'Settings', component: SettingPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.loader.present();
      this.quranService.syncData(() => {
        this.rootPage = QuranPage;
        // this.loader.dismiss();
        
        //set font
        this.settingService.get('fontSize').then(fontSize => {
          if (fontSize) {
            this.applicationFontSize = fontSize + 'px';
          } else {
            this.settingService.put('fontSize', this.baseFontSize);
          }
        });
        //hide splash screen
        this.splashScreen.hide();
      });
    });


    //font size changed 
    this.subscription = this.eventPublisher.fontSizeChanged$.subscribe(
      fontSize => {
        switch (fontSize) {
          case 1:
            fontSize = this.baseFontSize;
            break;
          case 2:
            fontSize = this.baseFontSize + 2;
            break;
          case 3:
            fontSize = this.baseFontSize + 4;
            break;
        }
        this.applicationFontSize = fontSize + 'px';
        this.settingService.put('fontSize', fontSize);
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
