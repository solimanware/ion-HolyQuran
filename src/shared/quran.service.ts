import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map';

import { DbService } from './db.service';

@Injectable()
export class QuranService {

    constructor(private http: Http, private dbService: DbService) {
       
    }   

    syncData () {
        this.http.get('./quran/quran-metadata.json')
            .map((res: Response) => res.json())
            .subscribe(res => {
                // data = res
                console.log(res);
                this.dbService.setItem('metadata', 'hizbs', res.quran.hizbs);
                this.dbService.setItem('metadata', 'juzs', res.quran.juzs);
                this.dbService.setItem('metadata', 'manzils', res.quran.manzils);
                this.dbService.setItem('metadata', 'pages', res.quran.pages);
                this.dbService.setItem('metadata', 'rukus', res.quran.rukus);
                this.dbService.setItem('metadata', 'sajdas', res.quran.sajdas);
                this.dbService.setItem('metadata', 'suras', res.quran.suras);
            });
    }
}