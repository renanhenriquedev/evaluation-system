import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../services/database';
import { Review } from '../models/Review';

// Cria uma nova avaliação
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

// Obtém todas as avaliações
export const getReviews = async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const reviews = await db.collection('reviews').find({}).toArray();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Obtém uma avaliação por ID
export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const db = getDb();
    const review = await db.collection('reviews').findOne({ _id: new ObjectId(id) });

    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Edita uma avaliação existente
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, rating, comment } = req.body;

    const db = getDb();
    const result = await db.collection('reviews').updateOne(
      { _id: new ObjectId(id) },
      { $set: { userId, rating, comment } }
    );

    if (result.matchedCount > 0) {
      const updatedReview = await db.collection('reviews').findOne({ _id: new ObjectId(id) });
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};

// Exclui uma avaliação
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const db = getDb();
    const result = await db.collection('reviews').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Review deleted successfully' });
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};
