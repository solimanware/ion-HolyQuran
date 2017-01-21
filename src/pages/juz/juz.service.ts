import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';
import { SchemaService } from '../../shared/schema.service';

@Injectable()
export class JuzService {
    private key: string = 'juzs';

    constructor(private dbService: DbService, private schemaService: SchemaService) {

    }

    getAll(): Promise<any> {
        return this.dbService.get(this.schemaService.tables.metadata, this.key)
        .then((result: any) => {
            return result.value.juz;
        });
    }

    getById(index){
        return this.getAll().then(juzs => {
            let juz = juzs.find(juz => juz.index == index);
            return juz;
        });
    }
}
