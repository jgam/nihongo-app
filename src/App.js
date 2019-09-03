import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Day from './Day';
import Level from './Level';
import Vocab from './Vocab';

//db steps

/*
1. Open a database
2. Create an object store in the database
3. Start transaction and make request to do some database operation, adding or retrieving data
4. Wait for the operation to complete by listening for the right kind of DOM event
5. Do something with the results
*/



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

    //db setup
    var request = indexedDB.open('vocabDB', 1);

    request.onupgradeneeded = function(event) {
      console.log('first db createion');
       var db = event.target.result;
       var productsStore = db.createObjectStore('VocabDB', {keyPath: 'id'});
   };
   request.onsuccess = function(event) {
    console.log('request done succesffullly');
    // some sample products data
    var vocabProgress = [
        {id: 1, name: 'Red Men T-Shirt', price: '$3.99'},
        {id: 2, name: 'Pink Women Shorts', price: '$5.99'},
        {id: 3, name: 'Nike white Shoes', price: '$300'},
        {id: 4, name: 'Jimmy', price: '$100.99'}
    ];

    // get database from event
    var db = event.target.result;

    // create transaction from database
    var transaction = db.transaction(["VocabDB"], 'readwrite');//more like giving access
    //var transaction = db.createObjectStore('vocabProgress', {keyPath: 'id'});
    // add success event handleer for transaction
    // you should also add onerror, onabort event handlers
    transaction.onsuccess = function(event) {
        console.log('[Transaction] ALL DONE!');
        console.log('erroorrrr!!');
    };

    // get store from transaction
    var productsStore = transaction.objectStore('VocabDB');

    /*************************************/

    // put products data in productsStore
    vocabProgress.forEach(function(vocab){//this is like lambda function
        var db_op_req = productsStore.add(vocab);

        db_op_req.onsuccess = function(event) {
            console.log(event.target.result === vocab.id); // true
            console.log('db transaction is true ');
        }
    });

    // count number of objects in store
    productsStore.count().onsuccess = function(event) {
        console.log('[Transaction - COUNT] number of products in store', event.target.result);
    };

    // get product with id 1
    productsStore.get(1).onsuccess = function(event) {
        console.log('[Transaction - GET] product with id 1', event.target.result);
    };

    // update product with id 1
    vocabProgress[0].name = 'Blue Men T-shirt';
    productsStore.put(vocabProgress[0]).onsuccess = function(event) {
        console.log('[Transaction - PUT] product with id 1', event.target.result);
    };
    /*
    // delete product with id 2
    productsStore.delete(2).onsuccess = function(event) {
        console.log('[Transaction - DELETE] deleted with id 2');
    };
     */
    };
  }

  //db add data!
  updateDB = () => {
    /*
    vocabProgress[0].name = 'Blue Men T-shirt';
     productsStore.put(vocabProgress[0]).onsuccess = function(event) {
         console.log('[Transaction - PUT] product with id 1', event.target.result);
     };
    */


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
    var request = indexedDB.open('vocabDB', 1);
    request.onsuccess = function(event){
      var db = event.target.result;
      var transaction = db.transaction(["VocabDB"], 'readwrite');
      var productsStore = transaction.objectStore('VocabDB');
      productsStore.get(1).onsuccess = function(event) {
        console.log('[Transaction - GET] product with id 1', event.target.result);
    };
    }

    console.log('request is : ',request);
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
