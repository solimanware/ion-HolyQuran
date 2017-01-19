import { Injectable } from '@angular/core';

import { DbService, SchemaService } from '../../shared/shared';

@Injectable()
export class VerseService {
    private storeName: string = 'verses';

    constructor(private dbService: DbService, private schemaService: SchemaService) {

    }

    getBySurahId(index) {
        return this.dbService.getItem(this.storeName, index)
            .then((result: any) => {
                return result;
            });
    }

    put(obj, callback) {
        this.dbService.put(this.schemaService.tables.verse, {
            value: obj,
            callback: callback
        });
    }
}
