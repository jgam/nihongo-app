import React, {useState} from 'react';
import logo from './logo.svg';
import './css/App.css';
import Day from './Day';
import Level from './Level';
import Vocab from './Vocab';
import Database from './Database';
import Exam from './Exam';
import Dexie from 'dexie'; 


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
      voc_rage: 0,
      testing_vocabs: []
    };

    //db setup
  
 }

  //db add data!
  updateDB = (request, output_words) => {
    /*
    vocabProgress[0].name = 'Blue Men T-shirt';
     productsStore.put(vocabProgress[0]).onsuccess = function(event) {
         console.log('[Transaction - PUT] product with id 1', event.target.result);
     };
    */
   //const db = new Dexie('VocabDB');
   //console.log('db is : ', db);
   //here lets call the api
   //console.log('request is here : ', request);
   //request.event.target.result.transaction('VocabDB', 'readwrite').objectStore('VocabDB')
   this.setState({
     page_state: '4'
   });


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
      day={this.state.days} handleHome={this.handleHome} updateDB={this.updateDB}/>;
    }
    else{
      //this part should be vocab. Then vocab call the Database to fetch. In doign that we need diffent approaches what to fetch
      return <Database condition={'2'} output_words={this.state.list_words}/>;
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
