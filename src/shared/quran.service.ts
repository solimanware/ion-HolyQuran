import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { DbService } from './db.service';
import { MetaDataService } from './metadata.service';
import { VerseService } from '../pages/verse/verse.service';
import { SuraService } from '../pages/sura/sura.service';

@Injectable()
export class QuranService {
    private baseUrl = './assets/data/';

    constructor(private http: Http
        , private verseService: VerseService, private suraService: SuraService
        , private metadataService: MetaDataService) {

    }

    syncData(successCallback?, errorCallback?) {
        Observable.forkJoin(
            this.getMetaData(),
            this.getVerses()
        )
            .subscribe(
            res => {
                this.metadataService.count().then((data: number) => {
                    if (data == 0) {
                        let metaData = res[0];
                        // this.metadataService.put('hizbs', metaData.quran.hizbs);
                        this.metadataService.put('juzs', metaData.quran.juzs);
                        // this.metadataService.put('manzils', metaData.quran.manzils);
                        // this.metadataService.put('pages', metaData.quran.pages);
                        // this.metadataService.put('rukus', metaData.quran.rukus);
                        // this.metadataService.put('sajdas', metaData.quran.sajdas);
                        for (let sr = 0; sr < metaData.quran.suras.sura.length; sr++) {
                            let sura = metaData.quran.suras.sura[sr];
                            sura.aindex = this.convertNumberalToArabic(sura.index);
                            metaData.quran.suras.sura[sr] = sura;
                        }
                        this.metadataService.put('suras', metaData.quran.suras);
                        let verses = res[1];
                        for (let i = 0; i < verses.length; i++) {
                            verses[i].aindex = this.convertNumberalToArabic(verses[i].index);
                            verses[i].ajuz = this.convertNumberalToArabic(verses[i].juz);
                            let ayas = verses[i].aya;
                            for (let j = 0; j < ayas.length; j++) {
                                ayas[j].aindex = this.convertNumberalToArabic(ayas[j].index);
                            }
                            verses[i].aya = ayas;
                            this.verseService.put(verses[i]);
                        }
                        console.log('done');
                        if (successCallback)
                            successCallback();
                    }
                });
            },
            (error) => {
                console.log('error');
                if (errorCallback)
                    errorCallback(error);
            });
    }

    getMetaData() {
        return this.http.get(`${this.baseUrl}quran-metadata.json`)
            .map((res: Response) => res.json());
    }

    getVerses() {
        return this.http.get(`${this.baseUrl}quran.json`)
            .map((res: Response) => res.json());
    }

    convertNumberalToArabic(text) {
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