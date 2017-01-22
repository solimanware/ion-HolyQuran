import { Injectable } from '@angular/core';

import { DbService } from '../../shared/db.service';
import { SchemaService } from '../../shared/schema.service';

declare var ydn: any; // Magic

@Injectable()
export class SettingService {

    constructor(private dbService: DbService, private schemaService: SchemaService) {

    }

    get(key: string) {
        return this.dbService.get(this.schemaService.tables.setting, key)
            .then(setting => {
                return setting.value;
            });
    }

    put(key: string, values) {
        return this.dbService.put(this.schemaService.tables.setting, {
            key: key,
            value: values
        });
    }

    remove(key: string) {
        return this.dbService.remove(this.schemaService.tables.setting, key);
    }
}
