import { Component, ViewChild, ElementRef } from '@angular/core';
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
    public bufferRatio = 3;
    private verseParams: VerseParams;

    constructor(private el: ElementRef, private navCtrl: NavController, private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private verseService: VerseService, private bookmarkService: BookmarkService) {
            this.verseParams = this.navParams.data;
     }

     ionViewWillEnter() {
        console.log(this.navParams.data);
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
            let indexToFind = this.ayas.findIndex((x:Verse) => x.index == this.verseParams.verseIndex.toString());
            console.log('index='+indexToFind);
            this.bufferRatio = indexToFind/3;
            setTimeout(() => {
                this.scrollTo(this.verseParams.verseIndex);
            },2000);
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
        let yOffset = element.offsetTop;
        console.log(yOffset);
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