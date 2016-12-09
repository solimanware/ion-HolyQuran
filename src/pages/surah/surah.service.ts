import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';

@Injectable()
export class SurahService {
    private storeName: string = 'metadata';
    private tableName: string = 'suras';

    constructor(private dbService: DbService) {

    }

    getAll(): Promise<any> {
        return this.dbService.getItem(this.storeName, this.tableName)
        .then((result: any) => {
            return result.sura;
        });
    }
}
