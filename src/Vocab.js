import React from 'react';
import { tsConstructorType } from '@babel/types';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

const Vocab = ({ output_words, handleButton, prevButton, nextButton, list_words, vocab_portion, day, handleHome, updateDB }) => {
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
        var vocabs_db = output_words;
        var testing_vocabs = [];
        var random_i = 10;
        while(random_i < vocabs_db.length - 10){
            //this done
            console.log('while loop random_i = ', random_i);
            testing_vocabs.push(vocabs_db[random_i - Math.floor(Math.random() * 10)]);
            random_i += 10;
        }
        vocabs_db = testing_vocabs;//now we are renewing the new vocabs to database
        //words is changed to testing_vocabs
        output_words = testing_vocabs;//words didn't change.

        var transaction = db.transaction('VocabDB', 'readwrite');

        //success event handler for transaction
        transaction.onsuccess = function(event){
            console.log('[transaction] ALL DONE!')
        }

        var productsStore = transaction.objectStore('VocabDB');

        vocabs_db.forEach(function(product){
            productsStore.add(product);//IDBRequest
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
    
    console.log('db is ', db);
    //var db = request.result;
    //console.log(db.transaction('VocabDB').objectStore('VocabDB'));

    //how do we await for output_words to be implemented first
    return (
	  <div>
        <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
        <ButtonToolbar>
            <Button onClick={()=> handleHome()}> home </Button>
        </ButtonToolbar>
		{/*<button onClick={() => handleButton(output_words.slice(0, 19))}>Home</button>*/}
        <br></br>
		<button onClick={() => prevButton(day-1,list_words.slice(vocab_portion*(day-2), vocab_portion*(day-1)),list_words,vocab_portion)}>Previous</button>
        <button onClick={() => nextButton(day+1,list_words.slice(vocab_portion*(day), vocab_portion*(day+1)),list_words,vocab_portion)}>Next</button>
        <br></br>
        <button onClick={()=> updateDB(output_words)}> Exam! </button>
        {/*{JSON.stringify(output_words)}*/}
        {/*{output_words.map((item) => <li>{item}</li>)}*/}
        {output_words.map(word => (
            <div className="word" key={word.word}>{word.word} : {word.meaning}</div>
        ))}
	  </div>
	);
  };
  
  export default Vocab;