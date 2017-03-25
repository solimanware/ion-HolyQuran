import { Component, OnInit, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SuraService } from './sura.service';
import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark } from '../bookmark/bookmark';
import { Sura } from './sura';
import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';

import { HelperService } from '../../shared/shared';

@Component({
    selector: 'page-sura',
    templateUrl: 'sura.html'
})
export class SuraPage implements OnInit {
    public surahs: Array<Sura> = [];

    constructor(private navCtrl: NavController, private renderer: Renderer
        , private surahService: SuraService, private bookmarkService: BookmarkService
        , private helperService: HelperService) {
    }

    ngOnInit() {
        //navigate user to bookmark
        this.bookmarkService.getAllApplicationBookmarks()
            .then((bookmarks: Array<Bookmark>)=> {
                if(bookmarks.length){
                    let bookmark = bookmarks[0];
                    this.goToVerses(null, bookmark.sura, bookmark.index);
                }
            });
    }

    ionViewWillEnter() {
        if(!this.surahs.length){
            this.surahService.getAll().then((surahs: Array<Sura>) => {
                this.surahs = surahs;
            });        
        }
        // .then(() => {
        //     this.bookmarkService.getAllApplicationBookmarks()
        //         .then((bookmarks: Array<Bookmark>) => {
        //             if(bookmarks.length > 0){
        //                 let bookmark = bookmarks[0];
        //             }
        //         });
        // });
    }

    goToVerses(event, sura: Sura, verseIndex?: number) {
        //TODO:pass sura name based on current language
        let params: VerseParams = {
            suraIndex: sura.index,
            suraName: sura.tname
        };
        if(verseIndex){
            params.verseIndex = verseIndex;
        }
        this.navCtrl.push(VersePage, params);
        if(event) {
            let elment = this.helperService.findAncestor(event.target, 'surahs-listview-item');
            let oldClasses = elment.getAttribute('class');
            this.renderer.setElementAttribute(elment, "class", oldClasses + ' sura-selected');
        }
    }
}