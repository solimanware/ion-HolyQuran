import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';
import { SchemaService } from '../../shared/schema.service';

@Injectable()
export class SurahService {
    private key: string = 'suras';

    constructor(private dbService: DbService, private schemaService: SchemaService) {

    }

    getAll(): Promise<any> {
        return this.dbService.get(this.schemaService.tables.metadata, this.key)
            .then((result: any) => {
                return result.value.sura;
            });
    }

    getById(index) {
        return this.getAll().then(suras => {
            let sura = suras.find(sura => sura.index == index);
            return sura;
        });
    }
}
