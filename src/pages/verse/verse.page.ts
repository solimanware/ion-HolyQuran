import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Content, NavController, NavParams, ActionSheetController, PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { VerseService } from './verse.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark, BookmarkType } from '../bookmark/bookmark';
import { Verse, VerseParams, VerseDetail } from './verse';
import { MoreOptionsPopoverPage } from './more-options-popover.page'; 
import _ from 'lodash';

@Component({
    selector: 'page-verse',
    templateUrl: 'verse.html'
})
export class VersePage {
    @ViewChild(Content) content: Content;
    private verseParams: VerseParams;
    private loader;
    private i = 0;
        // Init a timeout variable to be used below
    private timeout = null;


    verseDetail: any;
    ayas: Array<Verse> = [];
    pageTitle = '';
    bufferRatio = 3;

    constructor(private elRef: ElementRef, private renderer: Renderer, private navCtrl: NavController,
        private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private loadingCtrl: LoadingController, private alertCtrl: AlertController
        , private verseService: VerseService, private bookmarkService: BookmarkService) {
        this.verseParams = this.navParams.data;
        //cache loader
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
    }

    ionViewWillEnter() {
        // document.getElementById("ion-header")[0].style.display = "none";

        console.log(this.navParams.data);
        this.loader.present();
        this.verseService.getBySurahId(this.verseParams.suraIndex).then((verse) => {
            this.verseDetail = verse;
            console.log('VerseDetail');
            console.log(this.verseDetail);
            // this.pageTitle = `القرآن - (${this.verseDetail.aindex}) ${this.verseParams.suraName} - ${this.verseDetail.ajuz} جزء‎‎`;
            this.pageTitle = `(${this.verseDetail.index}) ${this.verseParams.suraName} - (${this.verseDetail.juz}) Juz`;
            this.ayas = verse.aya;
            console.log('firing');
        }).then(() => { 
            console.log('complete');
            if (this.verseParams.verseIndex) {
                //scroll to verse
                let indexToFind = this.ayas.findIndex((x: Verse) => x.index == this.verseParams.verseIndex);
                console.log('index=' + indexToFind);
                let countedBufferRatio = indexToFind / 3;
                if (countedBufferRatio > this.bufferRatio) {
                    this.bufferRatio = countedBufferRatio;
                }
                setTimeout(() => {
                    this.scrollTo(this.verseParams.verseIndex);
                    this.loader.dismiss();
                });
            } else {
                this.loader.dismiss();
                //no bookmark ? create current sura and first verse as bookmark
                this.bookMarkApplicationVerse(this.ayas[0], this.verseDetail);
            }
        }).catch(() => {
            this.loader.dismiss();
        });
    }

    touchmove(e){
        console.log('moving');
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(this.timeout);
        // Make a new timeout set to go off in 800ms
        this.timeout = setTimeout(() => {
            this.i++;
            console.log('Input Value');
        }, 300);
        // var debounced = _.debounce(() => {
        //     console.log('debounc');
        //     this.i++;
        // }, 5000);
        // debounced();
    }

    touchend(e){
        setTimeout(() => {
            console.log(e);
            console.log('touch end' + this.i);
        }, 350);

    }

    bookMarkVerse() {
        //find selected verse
        let verseToFind = this.ayas.filter((v: Verse) => v.isSelected);
        if (verseToFind.length) {
            let verse = verseToFind[0];
            //make current verse selected
            this.selectCurrentVerse(verse);
            this.bookmarkService.addVerseToBookmarks(verse, this.verseDetail, BookmarkType.User);
        }
    }

    bookMarkApplicationVerse(verse: Verse, verseDetail: VerseDetail) {
        //make current verse selected
        this.selectCurrentVerse(verse);
        this.bookmarkService.addOrUpdateApplicationBookmark(verse, verseDetail);
    }

    displayVerseActionSheet(verse: Verse, verseDetail: VerseDetail) {
        this.selectCurrentVerse(verse);
        this.presentVerseActionSheet(verse, verseDetail);
    }

    presentMoreOptionsPopover(event) {
        let popover = this.popoverCtrl.create(MoreOptionsPopoverPage);
        popover.present({
            ev: event
        });
    }

    presentPreviewModal() {
        //find selected verse
        let verseToFind = this.ayas.filter((v: Verse) => v.isSelected);
        if (verseToFind.length) {
            let verse = verseToFind[0];
            let previewDialog = this.alertCtrl.create({
                title: verse.aindex,
                subTitle: verse.text,
            });
            previewDialog.present();
        }
    }

    private scrollTo(verseIndex: number) {
        let verseKey = '#verse_' + verseIndex;
        console.log(verseKey);
        let hElement: HTMLElement = this.content._elementRef.nativeElement;
        let element = hElement.querySelector(verseKey);
        let offset = this.getElementOffset(element);
        console.log(offset);
        //its going too far. Let's decrease it.
        offset.top -= 45;
        this.content.scrollTo(0, offset.top)
        //make current verse selected
        let verseToFind = this.ayas.find((x: Verse) => x.index == this.verseParams.verseIndex);
        this.selectCurrentVerse(verseToFind);
        //change back buffer ratio to gain performance back
        setTimeout(() => {
            this.bufferRatio = 3;
        });
    }

    private selectCurrentVerse(verse: Verse) {
        //remove prev selected verse
        let prevSelectedVerses = this.ayas.filter((verse) => verse.isSelected);
        for (let prevVerse of prevSelectedVerses) {
            prevVerse.isSelected = false;
        }
        //make current verse selected
        verse.isSelected = true;
    }

    private getElementOffset(element) {
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
    }

    private presentVerseActionSheet(verse: Verse, verseDetail: VerseDetail) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Choose',
            buttons: [
                {
                    text: 'Bookmark this',
                    handler: () => {
                        console.log('bookmark clicked');
                        this.bookMarkVerse();
                    }
                },
                {
                    text: 'Preview',
                    handler: () => {
                        console.log('preview clicked');
                        this.presentPreviewModal();
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