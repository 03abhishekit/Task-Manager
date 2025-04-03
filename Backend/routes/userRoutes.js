

import express from 'express';
import { getUserProfile, login, logout, register } from '../controllers/userControllers.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", isAuthenticated, getUserProfile );

export{router};