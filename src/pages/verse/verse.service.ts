import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';

@Injectable()
export class VerseService {
    private storeName: string = 'verses';

    constructor(private dbService: DbService) {

    }

    getBySurahId(index) {
        return this.dbService.getItem(this.storeName, index)
        .then((result: any) => {
            return result;
        });
    }
}
