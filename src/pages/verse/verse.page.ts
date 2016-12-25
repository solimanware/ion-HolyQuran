import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, PopoverController }  from 'ionic-angular';

import { VerseService } from './verse.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Verse, VerseParams } from './verse';
import { MoreOptionsPopoverPage } from './more-options-popover.page';

@Component({
    selector: 'page-verse',
    templateUrl: 'verse.html'
})
export class VersePage {
    public verseDetail: any;
    public ayas: Array<Object> = [];
    public pageTitle = '';
    private verseParams: VerseParams;

    constructor(private navCtrl: NavController, private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private verseService: VerseService, private bookmarkService: BookmarkService) {
     }

     ionViewWillEnter() {
        console.log(this.navParams.data);
        this.verseParams = this.navParams.data;
        this.verseService.getBySurahId(this.verseParams.suraIndex).then((verse) => {
            this.verseDetail = verse;
            this.pageTitle = `القرآن - (${this.verseDetail.aindex}) ${this.verseParams.suraName} - ${this.verseDetail.ajuz} جزء‎‎`;
            this.ayas = verse.aya;
        });
     }

     bookMarkVerse(verse: Verse, verseDetail) {
         console.log(verseDetail);
         this.bookmarkService.addVerseToBookmarks(verse, verseDetail)
            .then((result: Verse) => {
            });
     }

     displayVerseActionSheet(verse: Verse, verseDetail) {
        this.presentVerseActionSheet(verse, verseDetail);
     }

     presentMoreOptionsPopover(event) {
        let popover = this.popoverCtrl.create(MoreOptionsPopoverPage);
        popover.present({
            ev: event
        });
     }

     private presentVerseActionSheet(verse: Verse, verseDetail) {
        let actionSheet = this.actionSheetCtrl.create({
        title: 'Choose',
        buttons: [
            {
                text: 'Bookmark this',
                handler: () => {
                    console.log('bookmark clicked');
                    this.bookMarkVerse(verse, verseDetail);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
        });
        actionSheet.present();
    }
}