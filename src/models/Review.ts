import { ObjectId } from "mongodb";
export interface Review {
    _id?: ObjectId;
    userId: string;
    rating: number;
    comment: string;
  }
  