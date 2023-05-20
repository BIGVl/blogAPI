import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router';
import passport from 'passport';
import authRouter from './auth';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(helmet()); // Helmet for security headers
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('dev')); // Logging requests

app.use(passport.initialize());

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
app.use('/admin', passport.authenticate('jwt', { session: false }));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
