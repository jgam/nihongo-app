import React, { Component } from 'react';

/*
DB creating steps
1. Open a database
2. Create an object store in the database
3. Start a transaction and make a request to do some database operation, like adding or retrieving dta.
4. Wait for the operation to complete by listening for the right kind of DOM event
5. Do something with the rsults(whcih can be found on the request object).
*/


const Database = ({ words }) =>{
    
    return(
        <div>
            hello world
            {words.map(word => (
            <div className="word" key={word.word}>{word.word} : {word.meaning}</div>
        ))}
        </div>
    )

}

export default Database;