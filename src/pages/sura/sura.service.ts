import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';
import { SchemaService } from '../../shared/schema.service';
import { MetaDataService } from '../../shared/metadata.service';

@Injectable()
export class SuraService {
    private key: string = 'suras';

    constructor(private dbService: DbService, private schemaService: SchemaService,
        private metaDataService: MetaDataService) {

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

    count() {
        return this.dbService.count(this.schemaService.tables.metadata, {
            key: this.key
        });
    } 
}
