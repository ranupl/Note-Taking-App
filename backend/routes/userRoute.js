import express from 'express';
const router = express.Router();
import { createUser } from '../controller/user.controller.js';


router.post('/createUser', createUser);

export default router; 
