import { Injectable } from '@angular/core';

@Injectable()
export class SchemaService {
    private _verse = "verse";

    schema = {
        stores: [
            {
                name: this._verse,
                keyPath: 'index'
            }
        ]
    };
    tables = {
        verse: this._verse,
    };
    
    constructor() {

    }
}