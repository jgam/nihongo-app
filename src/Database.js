import React from 'react';

/*
DB creating steps
1. Open a database
2. Create an object store in the database
3. Start a transaction and make a request to do some database operation, like adding or retrieving dta.
4. Wait for the operation to complete by listening for the right kind of DOM event
5. Do something with the rsults(whcih can be found on the request object).
*/


const Database = ({ words }) =>{
    var request = indexedDB.open('VocabDB', 1);
    var db, vocabs_db;
    /*
    Now, we write these words to database and use the data to randomly create the test.
    */
    //request on success
    request.onsuccess = function(event) {
        console.log('[onsuccess]', request.result);
        db = event.target.result; // === request.result

        //vocab DB data should be defined here
        var vocabs_db = words;
        var testing_vocabs = [];
        var random_i = 10;
        while(random_i < vocabs_db.length - 10){
            //this done
            console.log('while loop random_i = ', random_i);
            testing_vocabs.push(vocabs_db[random_i - Math.floor(Math.random() * 10)]);
            random_i += 10;
        }

        console.log(testing_vocabs)
        vocabs_db = testing_vocabs;//now we are renewing the new vocabs to database
        //just to see if it gets changed.
        words = testing_vocabs//just to see
        //here you need to shuffle the words
        //and put those words into as a vocab test.

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
        var productsStore = db.createObjectStore('VocabDB', {keyPath: 'index'});

    };

    //another method to access db and import from db
    //this can be reused with creating odab note!
    

    return(
        <div>
            hello world
            {vocabs_db.map(word => (
            <div className="word" key={word.word}>{word.word} : {word.meaning}</div>
        ))}
        </div>
    )

}

export default Database;