import { Injectable } from '@angular/core';

import { Verse } from './verse';
import { DbService } from '../../shared/db.service';
import { SchemaService } from '../../shared/schema.service';

@Injectable()
export class VerseService {
    private storeName: string = 'verses';

    constructor(private dbService: DbService, private schemaService: SchemaService) {

    }

    getBySurahId(index: number) {
        return this.getVerse(index);
        // return this.dbService.getItem(this.storeName, index)
        //     .then((result: any) => {
        //         return result;
        //     });
    }

    put(verse: Verse) {
        return this.dbService.put(this.schemaService.tables.verse, {
            value: verse
        });
    }

    getVerse(key: number) {
        return this.dbService.get(this.schemaService.tables.verse, key);
    }
}
