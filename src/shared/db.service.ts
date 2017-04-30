import { Injectable } from '@angular/core';

import { SchemaService } from './schema.service';

declare var ydn: any; // Magic

@Injectable()
export class DbService {
    // private dbName: string = 'perfect_quran_v1';
    private dbName: string = 'demo';
    private db: any;

    constructor(private schemaService: SchemaService) {
        var schema = {};
        this.db = new ydn.db.Storage(this.dbName, schemaService.schema);
    }

    get Db() {
        return this.db;
    } 

    put(store: string, opts: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let data = opts['value'];
            if (opts['key']) {
                this.db.put(store, opts)
                    .done(key => {
                        resolve(key);
                    });
            } else {
                this.db.put(store, data).done(key => {
                    resolve(key);
                });
            }
        });
    }

    get(store: string, key: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(store, key).done(key => {
                resolve(key);
            });
        });
    }

    getAll(store: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.from(store).list(10000).done(function (results) {
                resolve(results);
            })
        });
    }

    remove(store, key) {
        return new Promise((resolve, reject) => {
            this.db.remove(store, key).done(key => {
                resolve(key);
            });
        });
    }

    removeAll(store, callback) {
        return new Promise((resolve, reject) => {
            this.db.clear(store).done(key => {
                resolve(key);
            });
        });
    }

    count(store, opts?) {
        return new Promise((resolve, reject) => {
            if (opts && opts['key']) {
                this.db.count(store, ydn.db.KeyRange.only(opts['key'])).done(key => {
                    resolve(key);
                });
            } else {
                this.db.count(store).done(key => {
                    resolve(key);
                });
            }
        });
    }
}