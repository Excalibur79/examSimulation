import express from 'express';
import * as examController from '../../../controllers/examController';

const router = express.Router();
router.get('/createExamTable', examController.createExamTable);

export default router;
