import { Component } from '@angular/core';

import { SurahService } from './surah.service';

@Component({
    selector: 'page-surah',
    templateUrl: 'surah.html',
    providers: [SurahService]
})
export class SurahPage {
    public surahs: Array<Object> = [];

    constructor(private surahService: SurahService) {
        surahService.getAll().then((surahs: any) => {
            console.log(surahs);
            this.surahs = surahs;
        });
     }
}