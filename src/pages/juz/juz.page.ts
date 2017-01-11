import { Component, OnInit, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';
import { Juz } from './juz';
import { Sura } from '../surah/sura';

import { HelperService } from '../../shared/shared';
import { SurahService } from '../surah/surah.service';
import { JuzService } from './juz.service';

@Component({
    selector: 'page-juz',
    templateUrl: 'juz.html'
})
export class JuzPage implements OnInit {
    public juzs: Array<Juz> = [];

    constructor(private navCtrl: NavController, private renderer: Renderer
        , private juzService: JuzService, private suraService: SurahService, private helperService: HelperService) {

    }

    ngOnInit() {
        this.juzService.getAll().then((juzs: Array<Juz>) => {
            console.log(juzs);
            this.juzs = juzs;
        });
    }

    ionViewWillEnter() {

    }

    goToVerses(event, juz: Juz) {
        this.suraService.getById(juz.sura).then((sura: Sura) => {
            let params: VerseParams = {
                suraIndex: parseInt(juz.sura),
                verseIndex: parseInt(juz.aya),
                suraName: sura.name
            };
            this.navCtrl.push(VersePage, params);
            let elment = this.helperService.findAncestor(event.target, 'juzs-listview-item');
            let oldClasses = elment.getAttribute('class');
            this.renderer.setElementAttribute(elment, "class", oldClasses + ' juz-selected');
        });
    }
}