import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';

@Injectable()
export class JuzService {
    private storeName: string = 'metadata';
    private tableName: string = 'juzs';

    constructor(private dbService: DbService) {

    }

    getAll(): Promise<any> {
        return this.dbService.getItem(this.storeName, this.tableName)
        .then((result: any) => {
            return result.sura;
        });
    }

    getById(index){
        return this.getAll().then(juzs => {
            let juz = juzs.find(juz => juz.index == index);
            return juz;
        });
    }
}
