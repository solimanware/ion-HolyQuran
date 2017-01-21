import { Injectable } from '@angular/core';

@Injectable()
export class SchemaService {
    private _verse = "verse";
    private _metadata = "metadata";

    schema = {
        stores: [
            {
                name: this._verse,
                keyPath: 'index'
            },
            {
                name: this._metadata,
                keyPath: 'key'
            }
        ]
    };
    tables = {
        verse: this._verse,
        metadata: this._metadata
    };

    constructor() {

    }
}