import { MongoClient, Db } from 'mongodb';

const url = 'mongodb://localhost:27018';
const dbName = 'avaliacoes';

let _db: Db;

export const initDb = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    _db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

export const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized!');
  }
  return _db;
};
