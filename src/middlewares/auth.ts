import { HttpError } from '@/utils/error.js';
import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';

const key = JSON.parse(process.env.FIREBASE_ADMIN_KEY!);

admin.initializeApp({
  credential: admin.credential.cert(key),
});

export const authCheck = async (req: Request) => {
  const token = req.headers.authorization;
  if (!token) throw new Error('Unauthorized');

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const authCheckExpress = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) return next(new HttpError(401, 'Unauthorized'));

  try {
    await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    return next(new HttpError(401, 'Invalid or expired token'));
  }
};
