import { Component, OnInit, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';

import { VersePage } from '../verse/verse.page';
import { VerseParams } from '../verse/verse';
import { Juz } from './juz';
import { Sura } from '../sura/sura';

import { HelperService } from '../../shared/shared';
import { SuraService } from '../sura/sura.service';
import { JuzService } from './juz.service';

@Component({
    selector: 'page-juz',
    templateUrl: 'juz.html'
})
export class JuzPage implements OnInit {
    public juzs: Array<Juz> = [];

    constructor(private navCtrl: NavController, private renderer: Renderer
        , private juzService: JuzService, private suraService: SuraService, private helperService: HelperService) {

    }

    ngOnInit() {
        this.juzService.getAll().then((juzs: Array<Juz>) => {    
            this.juzs = juzs;
            for(let i =0;i<this.juzs.length;i++){
                this.suraService.getById(this.juzs[i].sura).then((sura : Sura)=>{
                    this.juzs[i].suraName = sura.tname;
                })                
            }
            console.log(juzs);
        });
    }

    ionViewWillEnter() {

    }

    goToVerses(event, juz: Juz) {
        this.suraService.getById(juz.sura).then((sura: Sura) => {
            let params: VerseParams = {
                suraIndex: parseInt(juz.sura),
                verseIndex: parseInt(juz.aya),
                suraName: sura.tname
            };
            this.navCtrl.push(VersePage, params);
            let elment = this.helperService.findAncestor(event.target, 'juzs-listview-item');
            let oldClasses = elment.getAttribute('class');
            this.renderer.setElementAttribute(elment, "class", oldClasses + ' juz-selected');
        });
    }
}