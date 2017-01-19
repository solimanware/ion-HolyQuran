import { Injectable } from '@angular/core';

import { Verse } from './verse';
import { DbService } from '../../shared/db.service';
import { SchemaService } from '../../shared/schema.service';

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

    putData(verse: Verse) {
        return this.dbService.putData(this.schemaService.tables.verse, {
            value: verse
        });
    }

    getData(key: number) {
        return this.dbService.getData(this.schemaService.tables.verse, key);
    }
}
