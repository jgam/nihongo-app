import React from 'react';

const Vocab = ({ output_words, handleButton }) => {
    console.log(output_words);
	return (
	  <div>
		<button onClick={() => handleButton(output_words.slice(0, 19))}>this is vocabs</button>
        {JSON.stringify(output_words)}
	  </div>
	);
  };
  
  export default Vocab;
  