import { Injectable } from '@angular/core';

import { default as localforage } from "localforage";

@Injectable()
export class DbService {
    private dbName: string = 'perfect_quran_v1';

    constructor () {
        console.log('localforage');
                console.log(localforage);

    }   

    setItem (store: string, key: string, value: any) : Promise<any>{
        var storeInstance = localforage.createInstance({
            storeName: store,
            name: this.dbName
        });
        var setPromise = storeInstance.setItem(key, value)
        .then((value: any) => {
            return value;
        }).catch((err: any) => {
            // we got an error
            console.log('we got error');
            console.log(err);
        });
        return setPromise;
    }

    getItem (store: string, key: string) : Promise<any> {
        var storeInstance = localforage.createInstance({
            storeName: store,
            name: this.dbName
        });
        return storeInstance.getItem(key);
    }

    removeItem(key: string) : Promise<any>{
        return localforage.removeItem(key);
    }
}