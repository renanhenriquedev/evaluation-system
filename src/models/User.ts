import { ObjectId } from "mongodb";

// src/models/User.ts
export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
  }
  