import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { DbService } from './db.service';

@Injectable()
export class QuranService {
    private baseUrl = './assets/data/';

    constructor(private http: Http
    , private dbService: DbService) {
       
    }   

    syncData (successCallback?, errorCallback?) {
        Observable.forkJoin(
            this.getMetaData(),
            this.getVerses()
        )
        .subscribe(
            res => {
                let metaData = res[0];
                this.dbService.setItem('metadata', 'hizbs', metaData.quran.hizbs);
                this.dbService.setItem('metadata', 'juzs', metaData.quran.juzs);
                this.dbService.setItem('metadata', 'manzils', metaData.quran.manzils);
                this.dbService.setItem('metadata', 'pages', metaData.quran.pages);
                this.dbService.setItem('metadata', 'rukus', metaData.quran.rukus);
                this.dbService.setItem('metadata', 'sajdas', metaData.quran.sajdas);
                for(let sr = 0; sr < metaData.quran.suras.sura.length; sr++){
                    let sura = metaData.quran.suras.sura[sr];
                    sura.aindex = this.convertNumberalToArabic(sura.index);
                    metaData.quran.suras.sura[sr] = sura;
                }
                this.dbService.setItem('metadata', 'suras', metaData.quran.suras);   
                let verses = res[1];   
                for (let i = 0; i < verses.length; i++) {
                    verses[i].aindex = this.convertNumberalToArabic(verses[i].index);
                    verses[i].ajuz = this.convertNumberalToArabic(verses[i].juz);
                    let ayas = verses[i].aya;
                    for (let j = 0; j < ayas.length; j++) {
                        ayas[j].aindex = this.convertNumberalToArabic(ayas[j].index);
                    }
                    verses[i].aya = ayas;
                    this.dbService.setItem('verses', verses[i].index, verses[i]);
                }
            },
            (error) => {
                console.log('error');
                if(errorCallback)
                    errorCallback(error);
            }, 
            () => { 
                console.log('successCallback');
                if(successCallback)
                    successCallback();
            })
    }

    getMetaData () { 
        return this.http.get(`${this.baseUrl}quran-metadata.json`)
            .map((res: Response) => res.json());
    }

    getVerses () {
        return this.http.get(`${this.baseUrl}quran.json`)
            .map((res: Response) => res.json());
    }

    convertNumberalToArabic (text) {
        let arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        let chars = text.split('');
        for (let i = 0; i < chars.length; i++) {
            if (/\d/.test(chars[i])) {
                chars[i] = arabicNumbers[chars[i]];
            }
        }
        return chars.join('');
    }
}