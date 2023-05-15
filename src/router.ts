import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log('This is the root route');
  res.json("Hi! You've reached the root route");
});

export default router;
