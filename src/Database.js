import React from 'react';

/*
DB creating steps
1. Open a database
2. Create an object store in the database
3. Start a transaction and make a request to do some database operation, like adding or retrieving dta.
4. Wait for the operation to complete by listening for the right kind of DOM event
5. Do something with the rsults(whcih can be found on the request object).
*/


const Database = ({ level, handleButton }) =>{
    var request = indexedDB.open('VocabDB', 1);
    var db;

    //request on success
    request.onsuccess = function(event) {
        console.log('[onsuccess]', request.result);
        db = event.target.result; // === request.result

        //vocab DB data should be defined here
        var vocabs_db = [
            {id: 1, name: 'red', price: '$3.99'},
            {id: 2, name: 'blue', price: '$4.99'}
        ];

        var transaction = db.transaction('VocabDB', 'readwrite');

        //success event handler for transaction
        transaction.onsuccess = function(event){
            console.log('[transaction] ALL DONE!')
        }

        var productsStore = transaction.objectStore('VocabDB');

        vocabs_db.forEach(function(product){
            var db_op_req = productsStore.add(product);//IDBRequest
        });
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
        var productsStore = db.createObjectStore('VocabDB', {keyPath: 'id'});

    };

    return(
        <div>
            hello world
        </div>
    )

}

export default Database;