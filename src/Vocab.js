import React from 'react';
import Dexie from 'dexie';
import { tsConstructorType } from '@babel/types';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { deflateRawSync } from 'zlib';
import Database from './Database';

const Vocab = ({ output_words, handleButton, prevButton, nextButton, list_words, vocab_portion, day, handleHome, updateDB }) => {
    

    //how do we await for output_words to be implemented first
    return (
	  <div>
        <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                crossOrigin="anonymous"
            />
        <ButtonToolbar>
            <Button onClick={()=> handleHome()}> home </Button>
        </ButtonToolbar>
		{/*<button onClick={() => handleButton(output_words.slice(0, 19))}>Home</button>*/}
        <br></br>
		<button onClick={() => prevButton(day-1,list_words.slice(vocab_portion*(day-2), vocab_portion*(day-1)),list_words,vocab_portion)}>Previous</button>
        <button onClick={() => nextButton(day+1,list_words.slice(vocab_portion*(day), vocab_portion*(day+1)),list_words,vocab_portion)}>Next</button>
        <br></br>
        <button onClick={()=> updateDB(output_words)}> Exam! </button>
        <Database condition={'1'} output_words={output_words}/>
        {output_words.map(word => (
            <div className="word" key={word.word}>{word.word} : {word.meaning}</div>
        ))}
	  </div>
	);
  };
  
  export default Vocab;