import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ActionSheetController, PopoverController }  from 'ionic-angular';

import { VerseService } from './verse.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Verse, VerseParams } from './verse';
import { MoreOptionsPopoverPage } from './more-options-popover.page';

@Component({
    selector: 'page-verse',
    templateUrl: 'verse.html'
})
export class VersePage {
    @ViewChild(Content) content: Content;

    public verseDetail: any;
    public ayas: Array<Object> = [];
    public pageTitle = '';
    public viewmode = '1';
    private verseParams: VerseParams;

    constructor(private navCtrl: NavController, private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private verseService: VerseService, private bookmarkService: BookmarkService) {
            this.verseParams = this.navParams.data;
     }

     ionViewWillEnter() {
        console.log(this.navParams.data);
        if(this.verseParams.verseIndex != null){
            //change viewmode as virtual list view doest support scrollTo
            this.viewmode = '2';
        }
        this.verseService.getBySurahId(this.verseParams.suraIndex).then((verse) => {
            this.verseDetail = verse;
            // this.pageTitle = `القرآن - (${this.verseDetail.aindex}) ${this.verseParams.suraName} - ${this.verseDetail.ajuz} جزء‎‎`;
            this.ayas = verse.aya;
            if(this.verseParams.verseIndex != null){
                //scroll to verse
                //this.content.scrollTo()
            }
            console.log('firing');
        }).then(() => {
            console.log('complete');
            setTimeout(() => {
                this.scrollTo(26);
            },5000);
        });
     }

    ionViewDidEnter() {

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

     private scrollTo(verseIndex) {
        let verseKey = 'verse_' + verseIndex;
        console.log(verseKey);
        let element = document.getElementById(verseKey);
        console.log(element);
        // let yOffset = document.getElementById('verse_' + verseIndex).offsetTop;
        // this.content.scrollTo(0, yOffset, 4000)
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