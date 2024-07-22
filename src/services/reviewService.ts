// src/services/reviewService.ts
import { MongoClient, Db } from 'mongodb';

let _db: Db;

export const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized!');
  }
  return _db;
};

export const initDb = async () => {
  const mongoURI = 'mongodb://localhost:27018';
  const dbName = 'avaliacoes';

  const client = new MongoClient(mongoURI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    _db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};
