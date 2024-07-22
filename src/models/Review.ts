import { ObjectId } from "mongodb";

// src/models/Review.ts
export interface Review {
    _id?: ObjectId;
    userId: string;
    rating: number;
    comment: string;
  }
  