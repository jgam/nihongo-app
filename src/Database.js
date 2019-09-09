import Dexie from 'dexie';

const Database = new Dexie('VocabDB');
Database.version(1).stores({
    friends: `name, age`
});

export default Database;
