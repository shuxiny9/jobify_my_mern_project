import { Router } from 'express';
import { validateJobInput,validateIdParam } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobController.js';

router.route('/').get(getAllJobs)
.post(checkForTestUser, validateJobInput, createJob);


router.route('/stats').get(showStats);

router.route('/:id')
.get(checkForTestUser,validateIdParam, getJob)
.patch(checkForTestUser,validateJobInput,validateIdParam, updateJob)
.delete(checkForTestUser,validateIdParam, deleteJob);

export default router;