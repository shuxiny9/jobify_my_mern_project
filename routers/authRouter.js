import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';
import { validateLoginInput } from '../middleware/validationMiddleware.js';
import { logout } from '../controllers/authController.js';
import rateLimiter from 'express-rate-limit';


const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
});

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;