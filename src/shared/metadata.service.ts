import { Injectable } from '@angular/core';

import { DbService } from './db.service';
import { SchemaService } from './schema.service';

// declare var ydn: any; // Magic

@Injectable()
export class MetaDataService {
    private storeName: string = 'metadata';

    constructor(private dbService: DbService, private schemaService: SchemaService) {

    }

    // load(opt) {
    //     return new Promise((resolve, reject) => {
    //         // if (opt['filters'] && opt['filters'].key && opt['filters'].value) {
    //         let keyRange = ydn.db.KeyRange.only(opt['filters'].value);
    //         this.dbService.Db.values(new ydn.db.IndexValueIterator(this.schemaService.tables.metadata, opt['filters'].key, keyRange))
    //             .done(() => {
    //                 resolve();
    //             });
    //         // } else {
    //         // added limit value of 5000 because YDN-DB default is 100
    //         // this.dbService.Db.values(this.schemaService.tables.metadata + '_' + groupName, null, 5000).always(opt['callback']);
    //         // }
    //     });
    // }

    get(metadataType: string) {
        return this.dbService.get(this.storeName, metadataType);
    }

    put(metadataType: string, values) {
        return this.dbService.put(this.schemaService.tables.metadata, {
            key: metadataType,
            value: values
        });
    }
}
