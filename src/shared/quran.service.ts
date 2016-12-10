import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { DbService } from './db.service';

@Injectable()
export class QuranService {
    private baseUrl = './quran/';

    constructor(private http: Http, private dbService: DbService) {
       
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
                this.dbService.setItem('metadata', 'suras', metaData.quran.suras);   
                let verses = res[1];   
                for (let i = 0; i < verses.length; i++) {
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
}