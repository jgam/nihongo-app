import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


const Level = ({ handleButton }) => {
	return (
	  <div>
		<button onClick={() => handleButton('N5')}>N5</button>
		<button onClick={() => handleButton('N4')}>N4</button>
		<button onClick={() => handleButton('N3')}>N3</button>
		<button onClick={() => handleButton('N2')}>N2</button>
		<button onClick={() => handleButton('N1')}>N1</button>
		<ButtonToolbar>
		<Button variant="outline-primary">Primary</Button>
		</ButtonToolbar>
	  </div>
	);
  };
  
  export default Level;
  