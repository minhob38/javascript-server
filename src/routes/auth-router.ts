import express from 'express';

const router: express.Router = express.Router();

router.post('/signup', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(200).json({
    a: 'hello',
  });
});

export default router;
