import { authCheckExpress } from '@/middlewares/auth.js';
import { HttpError } from '@/utils/error.js';
import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

// Upload image to cloudinary
router.post(
  '/upload',
  authCheckExpress,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await cloudinary.uploader.upload(req.body.image);
      res.status(201).json(result);
    } catch (error) {
      console.log((error as Error).message);
      return next(
        new HttpError(500, 'Failed to upload image. Please try again later.')
      );
    }
  }
);

// Delete image from cloudinary
router.post(
  '/remove',
  authCheckExpress,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await cloudinary.uploader.destroy(req.body.public_id);
      res.json({ result });
    } catch (error) {
      console.log((error as Error).message);
      return next(
        new HttpError(500, 'Failed to delete image. Please try again later.')
      );
    }
  }
);

export const imageRouter = router;
