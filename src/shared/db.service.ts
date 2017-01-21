import { Injectable } from '@angular/core';

import { default as localforage } from "localforage";
import _ from 'lodash';

import { SchemaService } from './schema.service';

declare var ydn: any; // Magic

@Injectable()
export class DbService {
    // private dbName: string = 'perfect_quran_v1';
    private dbName: string = 'pq';
    private db: any;

    constructor(private schemaService: SchemaService) {
        var schema = {};
        this.db = new ydn.db.Storage('demo', schemaService.schema);
    }

    get Db() {
        return this.db;
    }

    getAllItems(storeName: string) {
        let storeInstance = localforage.createInstance({
            storeName: storeName,
            name: this.dbName
        });
        storeInstance.setDriver([localforage.INDEXEDDB, localforage.WEBSQL]);
        let keyValues = [];
        // The same code, but using ES6 Promises.
        let allItemsPromise = storeInstance.iterate(function (value, key, iterationNumber) {
            // Resulting key/value pair -- this callback will be executed for every item in the database
            // console.log([key, value]);
            keyValues.push(value)
        }).then(function () {
            // console.log('Iteration has completed');
            return keyValues;
        }).catch(function (err) {
            // This code runs if there were any errors
            // console.log(err);
            return err;
        });

        return allItemsPromise;
    }

    setItem(store: string, key: string, value: any): Promise<any> {
        let storeInstance = localforage.createInstance({
            storeName: store,
            name: this.dbName
        });
        storeInstance.setDriver([localforage.INDEXEDDB, localforage.WEBSQL]);
        // console.log(`setting ${key} value ${JSON.stringify(value)}`);

        let setPromise = storeInstance.setItem(key, value)
            .then((value: any) => {
                // console.log('value stored');
                // console.log(value);
                return value;
            }).catch((err: any) => {
                // we got an error
                console.log('we got error');
                console.log(err);
            });
        return setPromise;
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

    getItem(store: string, key: string): Promise<any> {
        let storeInstance = localforage.createInstance({
            storeName: store,
            name: this.dbName
        });
        storeInstance.setDriver([localforage.INDEXEDDB, localforage.WEBSQL]);
        return storeInstance.getItem(key);
    }

    removeItem(store: string, key: string): Promise<any> {
        let storeInstance = localforage.createInstance({
            storeName: store,
            name: this.dbName
        });
        storeInstance.setDriver([localforage.INDEXEDDB, localforage.WEBSQL]);
        return storeInstance.removeItem(key);
    }
}