import React from 'react';

const Vocab = ({ handleButton }) => {
    var words = ['1','2','3'];
	return (
	  <div>
		<button onClick={() => handleButton(words.slice(0, 19))}>this is vocabs</button>
	  </div>
	);
  };
  
  export default Vocab;
  