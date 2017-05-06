import { Component, OnInit, Renderer, ViewChild } from '@angular/core';
import { Content, NavController } from 'ionic-angular';

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
    @ViewChild(Content) content: Content;

    surahs: Array<Sura> = [];
    bufferRatio = 3;

    constructor(private navCtrl: NavController, private renderer: Renderer
        , private surahService: SuraService, private bookmarkService: BookmarkService
        , private helperService: HelperService) {
    }

    ngOnInit() {
        // let oldClasses = this.content._elementRef.nativeElement.getAttribute('class');
        // this.renderer.setElementAttribute(this.content._elementRef.nativeElement, "class", oldClasses + ' hide');
        //navigate user to bookmark
        this.bookmarkService.getAllApplicationBookmarks()
            .then((bookmarks: Array<Bookmark>)=> {
                if(bookmarks.length){
                    let bookmark = bookmarks[0];
                    this.goToVerses(bookmark.sura, bookmark.index);
                    //load the suras if not loaded as scrollTo will not work untill data is loaded
                    // this.loadSuras().then(()=> {
                    //     let indexToFind = this.surahs.findIndex((sura: Sura) => sura.index == bookmark.sura.index);
                    //     console.log('sura_index=' + indexToFind);
                    //     let countedBufferRatio = indexToFind / 3;
                    //     if (countedBufferRatio > this.bufferRatio) {
                    //         this.bufferRatio = countedBufferRatio;
                    //     }
                    //     setTimeout(()=> {
                    //         this.scrollTo(bookmark.sura);
                    //     });
                    //     //intentionally navigate late so that the view is loaded and apeared properly 
                    //     this.goToVerses(bookmark.sura, bookmark.index);
                    // });
                }
            });
    }

    ionViewDidEnter() {
        this.loadSuras().then(() => { 
            // let oldClasses = this.content._elementRef.nativeElement.getAttribute('class');
            // oldClasses = oldClasses.replace('hide', '');
            // this.renderer.setElementAttribute(this.content._elementRef.nativeElement, "class", oldClasses);
        })
        // .then(() => {
        //     this.bookmarkService.getAllApplicationBookmarks()
        //         .then((bookmarks: Array<Bookmark>) => {
        //             if(bookmarks.length > 0){
        //                 let bookmark = bookmarks[0];
        //             }
        //         });
        // });
    }

    goToVerses(sura: Sura, verseIndex?: number) {
        //TODO:pass sura name based on current language
        let params: VerseParams = {
            suraIndex: sura.index,
            suraName: sura.tname
        };
        //will be pass if any bookmark is set and application is started
        if(verseIndex){
            params.verseIndex = verseIndex;
        }
        this.navCtrl.push(VersePage, params);
        //mark the current as selected
        this.selectCurrentSura(sura);
        // if(event) {
        //     let elment = this.helperService.findAncestor(event.target, 'surahs-listview-item');
        //     let oldClasses = elment.getAttribute('class');
        //     this.renderer.setElementAttribute(elment, "class", oldClasses + ' sura-selected');
        // }
    }

    private loadSuras() {
        return new Promise((resolve, reject) => {
            if(!this.surahs.length){
                this.surahService.getAll().then((surahs: Array<Sura>) => {
                    this.surahs = surahs;
                    resolve();
                });        
            } else {
                resolve();
            }
        });
    }

    private scrollTo(sura: Sura) {
        let suraKey = '#sura_' + sura.index;
        console.log(suraKey);
        let hElement: HTMLElement = this.content._elementRef.nativeElement;
        let element = hElement.querySelector(suraKey);
        let offset = this.getElementOffset(element);
        console.log(offset);
        //its going too far. Let's decrease it.
        offset.top -= 100;
        this.content.scrollTo(0, offset.top)
        //make current verse selected
        // this.selectCurrentSura(sura);
        // let verseToFind = this.ayas.find((x: Verse) => x.index == this.verseParams.verseIndex);
        // this.selectCurrentVerse(verseToFind);
        // //change back buffer ratio to gain performance back
        // setTimeout(() => {
        //     this.bufferRatio = 3;
        // });
    }

    private getElementOffset(element) {
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
    }

    private selectCurrentSura(sura: Sura) {
        //remove prev selected
        let prevSelectedSuras = this.surahs.filter((sura) => sura.isSelected);
        for (let prevSura of prevSelectedSuras) {
            prevSura.isSelected = false;
        }
        //make current selected
        sura.isSelected = true;
    }

}