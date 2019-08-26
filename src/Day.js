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
    

	return (
	  <div>
		<button onClick={() => handleButton(1,words.slice(0, 19))}>day 1</button>
	  </div>
	);
  };
  
  export default Day;
  