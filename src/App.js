import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Day from './Day';
import Level from './Level';
import Vocab from './Vocab';
import { DBConfig } from './DBConfig';
import{ initDB } from 'react-indexed-db';
import { IndexedDB } from 'react-indexed-db';

initDB(DBConfig);
var request = window.indexedDB.open("MyTestDatabase", 3);
console.log(request);

request.onerror = function(event) {
  // Do something with request.errorCode!
};
request.onsuccess = function(event) {
  // Do something with request.result!
};

var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function(event) {
  console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
  db = event.target.result;
};

// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  // Handle errors.
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
  };
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
    this.setState({
      page_state:'3',
      days: input_days,
      words: words_list,
      list_words: list_words,
      voc_range: vocab_portion
    });
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
