import { Injectable } from '@angular/core';

import { default as localforage } from "localforage";
import _ from 'lodash';

@Injectable()
export class DbService {
    // private dbName: string = 'perfect_quran_v1';
    private dbName: string = 'pq';

    constructor() {

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