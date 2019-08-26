import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import Day from './Day';
import Level from './Level';
import Vocab from './Vocab';

class App extends React.Component {
  //constructor sets the state
  constructor(props){
    super(props);
    this.state = {
      page_state: '1',
      level: '',
      days: '',
      words: []
    };
  }
  //handle functions update the states
  handleLevel = input_level => {
    this.setState({
      page_state: '2',
      level: input_level
    });
  }

  handleDays = (input_days, words_list) => {
    this.setState({
      page_state:'3',
      days: input_days,
      words: words_list
    });
    console.log('in handledays');
    console.log(words_list);
  }

  handleVocab = (input_vocab, definitions) => {
    this.setState({

    })
  }

  render_views = page_state => {
    if(page_state === '1'){
      console.log('here')
      return <Level handleButton={this.handleLevel}/>
    }
    else if(page_state === '2'){
      return <Day level={this.state.level} handleButton={this.handleDays}/>
    }
    else if(page_state === '3'){
      return <Vocab output_words={this.state.words} handleButton={this.handleVocab}/>;
    }

    else{
      return 'error occurred';
    }
  }

  render(){
    //state logic
    var current_state = this.state.page_state;
    console.log(this.state.level);

    //return
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload + welcome to nihongo app
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        
        <div className="stateViews">
          {this.render_views(current_state)}
        </div>
      </div>
    );
  }
}

export default App;
