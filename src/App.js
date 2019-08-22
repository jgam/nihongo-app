import React from 'react';
import logo from './logo.svg';
import './App.css';
import Day from './Day';
import Vocab from './Vocab';
import Level from './Level';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page_state: '1'
    };
  }

  render_views = page_state => {
    if(page_state === '1'){
      return ;
    }
    else if(page_state === '2'){
      return ;
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
