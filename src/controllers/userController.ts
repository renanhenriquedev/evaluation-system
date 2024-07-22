// src/controllers/userController.ts
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../services/database';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser: User = {
      name,
      email,
      password
    };

    const db = getDb();
    const result = await db.collection('users').insertOne(newUser);

    if (result.acknowledged) {
      const createdUser = await db.collection('users').findOne({ _id: result.insertedId });
      res.status(201).json(createdUser);
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const db = getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};
