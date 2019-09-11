import Dexie from 'dexie';
import React from 'react';
import { directive } from '@babel/types';


const Database = ({condition ,output_words}) => {
    var request = indexedDB.open('VocabDB', 1);
    var db, vocabs_db;
    /*
    Now, we write these words to database and use the data to randomly create the test.
    */
   console.log('initial outputwords are: ', output_words);
    
    //request on success
    request.onsuccess = function(event) {
        console.log('[onsuccess]', request.result);
        db = event.target.result; // === request.result

        //vocab DB data should be defined here
        var vocabs_db = output_words;
        var testing_vocabs = [];
        var random_i = 10;
        
        
        //taking out 1 vocab for every 10 vocabs
        while(random_i < vocabs_db.length - 10){
            //this done
            console.log('while loop random_i = ', random_i);
            testing_vocabs.push(vocabs_db[random_i - Math.floor(Math.random() * 10)]);
            random_i += 10;
        }
        vocabs_db = testing_vocabs;//now we are renewing the new vocabs to database
        //words is changed to testing_vocabs
        output_words = testing_vocabs;//words didn't change.
        console.log('after modified outputwords : ',output_words);

        var transaction = db.transaction('VocabDB', 'readwrite');

        //success event handler for transaction
        transaction.onsuccess = function(event){
            console.log('[transaction] ALL DONE!')
        }

        var productsStore = transaction.objectStore('VocabDB');
        if(condition == '1'){
            vocabs_db.forEach(function(product){
                productsStore.add(product);//IDBRequest
            });
        }
        else{
            productsStore.getAll().onsuccess = function(event){
                vocabs_db = event.target.result;
                return vocabs_db;
            };
        }
        /*
        some tips how to CRUD the data
        // count number of objects in store
        productsStore.count().onsuccess = function(event) {
            console.log('[Transaction - COUNT] number of products in store', event.target.result);
        };

        // get product with id 1
        productsStore.get(1).onsuccess = function(event) {
            console.log('[Transaction - GET] product with id 1', event.target.result);
        };

        // update product with id 1
        products[0].name = 'Blue Men T-shirt';
        productsStore.put(products[0]).onsuccess = function(event) {
            console.log('[Transaction - PUT] product with id 1', event.target.result);
        };

        // delete product with id 2
        productsStore.delete(2).onsuccess = function(event) {
            console.log('[Transaction - DELETE] deleted with id 2');
        };
        */
    };

    //request on error
    request.onerror = function(event) {
        console.log('[onerror]', request.error);
    };

    //request on upgrade needed 
    request.onupgradeneeded = function(event) {
        // create object store from db or event.target.result

        var db = event.target.result;
        //here crated Objectstore
        var productsStore = db.createObjectStore('VocabDB', {keyPath: 'index'});
        console.log('alelalelael');
    };
    console.log('outputwords are : ', output_words);
    
    return null;


}
/* 
const Database = new Dexie('VocabDB');
Database.version(1).stores({
    vocabs: `index,name, age`
});
*/
export default Database;
