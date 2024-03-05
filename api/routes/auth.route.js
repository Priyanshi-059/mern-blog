import express from 'express';
import { signup , signin} from '../controllers/auth.controller.js';

const router = express.Router();


// this is just to post the request
router.post('/signup',signup);

router.post('/signin',signin);

export default router;