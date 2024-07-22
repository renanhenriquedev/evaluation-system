// src/controllers/reviewController.ts
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../services/database';
import { Review } from '../models/Review';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, rating, comment } = req.body;

    const newReview: Review = {
      userId,
      rating,
      comment
    };

    const db = getDb();
    const result = await db.collection('reviews').insertOne(newReview);

    if (result.acknowledged) {
      const createdReview = await db.collection('reviews').findOne({ _id: result.insertedId });
      res.status(201).json(createdReview);
    } else {
      res.status(500).json({ error: 'Failed to create review' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const reviews = await db.collection('reviews').find({}).toArray();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};
