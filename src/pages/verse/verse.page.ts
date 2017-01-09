import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Content, NavController, NavParams, ActionSheetController, PopoverController, LoadingController } from 'ionic-angular';

import { VerseService } from './verse.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark, BookmarkType } from '../bookmark/bookmark';
import { Verse, VerseParams } from './verse';
import { MoreOptionsPopoverPage } from './more-options-popover.page';

@Component({
    selector: 'page-verse',
    templateUrl: 'verse.html'
})
export class VersePage {
    @ViewChild(Content) content: Content;

    public verseDetail: any;
    public ayas: Array<Verse> = [];
    public pageTitle = '';
    public bufferRatio = 3;
    private verseParams: VerseParams;
    private loader;

    constructor(private elRef: ElementRef, private renderer: Renderer, private navCtrl: NavController,
        private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private loadingCtrl: LoadingController,
        private verseService: VerseService, private bookmarkService: BookmarkService) {
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
            // this.pageTitle = `القرآن - (${this.verseDetail.aindex}) ${this.verseParams.suraName} - ${this.verseDetail.ajuz} جزء‎‎`;
            this.ayas = verse.aya;
            console.log('firing');
        }).then(() => {
            console.log('complete');
            if (this.verseParams.verseIndex) {
                //scroll to verse
                let indexToFind = this.ayas.findIndex((x: Verse) => x.index == this.verseParams.verseIndex.toString());
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
        });
    }

    bookMarkVerse(verse: Verse, verseDetail, bookmarkType: BookmarkType = BookmarkType.User) {
        console.log(verseDetail);
        this.bookmarkService.addVerseToBookmarks(verse, verseDetail, bookmarkType)
            .then((result: Verse) => {
            });
    }

    bookMarkApplicationVerse(verse: Verse, verseDetail) {
        this.bookmarkService.addOrUpdateApplicationBookmark(verse, verseDetail)
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
        let verseKey = '#verse_' + verseIndex;
        console.log(verseKey);
        let hElement: HTMLElement = this.elRef.nativeElement;
        let element = hElement.querySelector(verseKey);
        let offset = this.getElementOffset(element);
        let oldClasses = element.getAttribute('class');
        this.renderer.setElementAttribute(element, "class", oldClasses + ' verse-selected');
        console.log(offset);
        this.content.scrollTo(0, offset.top)
        //change back buffer ratio to gain performance back
        setTimeout(() => {
            this.bufferRatio = 3;
        });
    }

    private getElementOffset(element) {
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
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