import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; 

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = { name: username };

  const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
  res.json({ token });
};
