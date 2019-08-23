import React from 'react';

const Day = ({ handleButton }) => {
    var words = ['1','2','3'];
	return (
	  <div>
		<button onClick={() => handleButton(words.slice(0, 19))}>day 1</button>
	  </div>
	);
  };
  
  export default Day;
  