import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Content, NavController, NavParams, ActionSheetController, PopoverController, LoadingController, ModalController, ViewController } from 'ionic-angular';

import { VerseService } from '../verse.service';
import { BookmarkService } from '../../bookmark/bookmark.service';
import { Bookmark, BookmarkType } from '../../bookmark/bookmark';
import { Verse, VerseParams, VerseDetail } from '../verse';
import { MoreOptionsPopoverPage } from '../more-options-popover.page';

@Component({
    selector: 'page-modal-verse-preview',
    templateUrl: 'verse-preview.html'
})
export class VersePreviewModal {
    @ViewChild(Content) content: Content;

    public verseDetail: VerseDetail;
    public pageTitle = '';
    private verse: Verse;

    constructor(private elRef: ElementRef, private renderer: Renderer, private navCtrl: NavController,
        private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private popoverCtrl: PopoverController,
        private loadingCtrl: LoadingController, private modalCtrl: ModalController, private viewController: ViewController
        , private verseService: VerseService, private bookmarkService: BookmarkService) {
        this.verse = this.navParams.data.verse;
        this.verseDetail = this.navParams.data.verseDetail;
    }

    ionViewWillEnter() {
        this.pageTitle = `القرآن - (${this.verseDetail.aindex}) ${this.verseDetail.name} - ${this.verseDetail.ajuz} جزء‎‎`;
        console.log(this.verse);

    }

    dismissModal() {
        this.viewController.dismiss();
    }
}