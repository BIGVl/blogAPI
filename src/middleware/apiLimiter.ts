import { rateLimit } from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'You have exceeded the maximum requests, try again later.'
});

export default apiLimiter;
