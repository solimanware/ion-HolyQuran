import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Content, NavController, NavParams, ActionSheetController, PopoverController, LoadingController } from 'ionic-angular';

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

    constructor(private elRef: ElementRef, private renderer: Renderer, private navCtrl: NavController,
        private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private loadingCtrl: LoadingController,
        private verseService: VerseService, private bookmarkService: BookmarkService) {
        this.verseParams = this.navParams.data;
    }

    ionViewWillEnter() {
        console.log(this.navParams.data);
        let loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        this.verseService.getBySurahId(this.verseParams.suraIndex).then((verse) => {
            this.verseDetail = verse;
            // this.pageTitle = `القرآن - (${this.verseDetail.aindex}) ${this.verseParams.suraName} - ${this.verseDetail.ajuz} جزء‎‎`;
            this.ayas = verse.aya;
            // if(this.verseParams.verseIndex != null){
            //     //scroll to verse
            //     //this.content.scrollTo()
            // }
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
                    loader.dismiss();
                });
            } else {
                loader.dismiss();
            }
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