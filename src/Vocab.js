import React from 'react';
import { tsConstructorType } from '@babel/types';

const Vocab = ({ output_words, handleButton }) => {

    console.log(output_words);
    console.log('this props')
	return (
	  <div>
		<button onClick={() => handleButton(output_words.slice(0, 19))}>this is vocabs</button>
        {/*{JSON.stringify(output_words)}*/}
        {/*{output_words.map((item) => <li>{item}</li>)}*/}
        {output_words.map(word => (
            <div className="word" key={word.word}>{word.word} : {word.meaning}</div>
        ))}
	  </div>
	);
  };
  
  export default Vocab;
  