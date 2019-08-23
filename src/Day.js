import React from 'react';

const Day = ({ handleButton }) => {
	return (
	  <div>
		<button onClick={() => handleButton(words.slice(0, words_per_day))}>day 1</button>
	  </div>
	);
  };
  
  export default Day;
  