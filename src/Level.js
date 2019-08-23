import React from 'react';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'


const Level = ({ handleButton }) => {
	return (
	  <div>
		<link
			rel="stylesheet"
			href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			crossorigin="anonymous"
		/>
		<button onClick={() => handleButton('N5')}>N5</button>
		<button onClick={() => handleButton('N4')}>N4</button>
		<button onClick={() => handleButton('N3')}>N3</button>
		<button onClick={() => handleButton('N2')}>N2</button>
		<button onClick={() => handleButton('N1')}>N1</button>
		<ButtonToolbar>
			<Button onClick={()=> handleButton('N5')} variant="primary">Primary N5</Button>
		</ButtonToolbar>
	  </div>
	);
  };
  
  export default Level;
  