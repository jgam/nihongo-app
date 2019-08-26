import React from 'react';
import N5 from './json/N5.json';
import N4 from './json/N4.json';
import N3 from './json/N3.json';
import N2 from './json/N2.json';
import N1 from './json/N1.json';

const Day = ({ level, handleButton }) => {
  var words = [];
  if (level === 'N5') {
      words = N5;
  }
  else if(level === 'N4'){
      words = N4;
  }
  else if(level === 'N3'){
      words = N3;
  }
  else if(level === 'N2'){
      words = N2;
  }
  else{
      words = N1;
  }
    
  //essentially we need inputs to divide the days to come up with the plans
  //this needs to be done with web db
  
  var vocab_portion = parseInt(words.length / 7);

	return (
	  <div>
		<button onClick={() => handleButton(1,words.slice(vocab_portion*0, vocab_portion*1),words,vocab_portion)}>day 1</button>
		<button onClick={() => handleButton(2,words.slice(vocab_portion*1, vocab_portion*2),words,vocab_portion)}>day 2</button>
		<button onClick={() => handleButton(3,words.slice(vocab_portion*2, vocab_portion*3),words,vocab_portion)}>day 3</button>
		<button onClick={() => handleButton(4,words.slice(vocab_portion*3, vocab_portion*4),words,vocab_portion)}>day 4</button>
		<button onClick={() => handleButton(5,words.slice(vocab_portion*4, vocab_portion*5),words,vocab_portion)}>day 5</button>
		<button onClick={() => handleButton(6,words.slice(vocab_portion*5, vocab_portion*6),words,vocab_portion)}>day 6</button>
		<button onClick={() => handleButton(7,words.slice(vocab_portion*6, vocab_portion*7),words,vocab_portion)}>day 7</button>


	  </div>
	);
  };
  
  export default Day;
  