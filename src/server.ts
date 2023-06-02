import dotenv from 'dotenv';
dotenv.config();
import './types';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './router.ts';
import passport from './auth/passport.ts';
import authRouter from './auth/login.ts';
import articleRouter from './article/articleRouter.ts';
import commentRouter from './comment/commentRouter.ts';
import compression from 'compression';
import apiLimiter from './middleware/apiLimiter.ts';

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use('/', apiLimiter);
//Production settings
app.disable('x-powered-by');

if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
  console.error = function () {};
}

// Mongoose
mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/myapp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/', router);
app.use('/auth', authRouter);
app.use('/articles', articleRouter);
app.use('/articles/', commentRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const message = err.message || 'Internal Server Error';
  return res.status(500).json({ error: message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
