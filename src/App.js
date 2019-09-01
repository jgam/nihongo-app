import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Day from './Day';
import Level from './Level';
import Vocab from './Vocab';
import { DBConfig } from './DBConfig';
import{ initDB } from 'react-indexed-db';
import { IndexedDB } from 'react-indexed-db';

/*
//sample db data
// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

//calling the DB
var db;
var request = window.indexedDB.open("MyTestDatabase", 3);
console.log(request);

//calling requests error or success
request.onerror = function(event) {
  // Do something with request.errorCode!
  console.error("database error: " + event.target.errorCode);
  alert('wrong db asccsess!!!!')
};
request.onsuccess = function(event) {
  // Do something with request.result!
  db = event.target.result;
};
 */

 // This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

const dbName = "nihongo";

//open the database
var request = indexedDB.open(dbName, 1);
var db;

if(window.indexedDB){
  alert('allowed');
}

request.onsuccess = function(event){
  console.log('[onsuccess]', request.result);
  //db = event.target.result;//===request.result
  var products = [
    {id: 1, name: 'Red Men T-Shirt', price: '$3.99'},
    {id: 2, name: 'Pink Women Shorts', price: '%5.99'},
    {id: 3, name: 'Nike White Shoes', price: '$300'},
    {id: 4, user: "jimmy", progress:"done"}
  ];
  
  //get database from event
  var db = event.target.result;

  //create transaction from database
  var transaction = db.transaction('products', 'readwrite');

  //add success event handler for transaction
  //should also add onerror, onabort event handlers
  transaction.onsuccess = function(event){
    console.log('[Transaction] ALL DONE!');
  };

  //get store from transaction
  //returns IDBObjectStore instance
  var productStore = transaction.objectStore('products');

  //put products data in productStore
  products.forEach(function(product){
    var db_op_req = productStore.add(product);//IDBRequest
  });
};

request.onerror = function(event) {
  console.log('[onerror]', request.error);
};

request.onupgradeneeded = function(event) {
  // create object store from db or event.target.result
  var db = event.target.result;
  var store = db.createObjectStore('products', {keyPath: 'id'});
  //create unique index on keyPath === 'id'
  store.createIndex('products_id_unique', 'id', {unique:true});
};



class App extends React.Component {
  //constructor sets the state
  constructor(props){
    super(props);
    this.state = {
      page_state: '1',
      level: '',
      days: 0,
      words: [],
      list_words: [],
      voc_rage: 0
    };
  }
  //handle functions update the states
  handleLevel = input_level => {
    this.setState({
      page_state: '2',
      level: input_level
    });
  }

  handleDays = (input_days, words_list, list_words, vocab_portion) => {
    if (input_days > 0 && input_days < 8){
      this.setState({
        page_state:'3',
        days: input_days,
        words: words_list,
        list_words: list_words,
        voc_range: vocab_portion
      });
    }
    else{
      alert('This is either the first or last page');
    }
  }

  handleHome = () => {
    this.setState({
      page_state: '1',
      level: '',
      days: 0,
      words: [],
      list_words: [],
      voc_rage: 0
    })
  }

  handleVocab = (input_vocab, definitions) => {
    this.setState({

    })
  }


  render_views = page_state => {
    console.log('in renderviews: ', this.state.days);
    if(page_state === '1'){
      console.log('here')
      return <Level handleButton={this.handleLevel}/>
    }
    else if(page_state === '2'){
      return <Day level={this.state.level} handleButton={this.handleDays}/>
    }
    else if(page_state === '3'){
      return <Vocab output_words={this.state.words} handleButton={this.handleVocab}
      prevButton={this.handleDays} nextButton={this.handleDays} 
      list_words={this.state.list_words} vocab_portion={this.state.voc_range}
      day={this.state.days} handleHome={this.handleHome}/>;
    }
    else{
      return 'error occurred';
    }
  }

  render(){
    //state logic
    var current_state = this.state.page_state;
    console.log('state inputs days: ',this.state.days);

    //return
    return (
      <div className="App">
        <header className="App-header">
          <div className="btn-menu">
            <a href="">
              <em>
              </em>
            </a>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="stateViews">
          {this.render_views(current_state)}
        </div>
      </div>
    );
  }
}

export default App;
