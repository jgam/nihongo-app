import React from 'react';
import logo from './logo.svg';
import './App.css';
import Day from './Day';
import Level from './Level';
import Vocab from './Vocab';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page_state: '1',
      level: '',
      days: '',
      words: []
    };
  }

  handleLevel = input_level => {
    this.setState({
      level: input_level
    });
  }

  handleDays = input_days => {
    this.setState({
      days: input_days
    });
  }

  handleVocab = (input_vocab, definitions) => {
    this.setState({

    })
  }

  render_views = page_state => {
    if(page_state === '1'){
      console.log('here')
      return <Level handleLevel={this.handleLevel}/>
    }
    else if(page_state === '2'){
      return <Level handleLevel={this.handleLevel}/>
    }
    else if(page_state === '3'){
      return ;
    }
    else{
      return 'error occurred';
    }
  }

  render(){
    //state logic
    var current_state = this.state.page_state;

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
