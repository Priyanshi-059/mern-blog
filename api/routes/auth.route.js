import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();


// this is just to post the request
router.post('/signup',signup);

export default router;