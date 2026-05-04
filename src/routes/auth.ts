import express from "express";
import { register, login, logout, fetchUserData } from "../controller/auth";
import { checkIfAuthorized } from "../middleware/middleware";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', checkIfAuthorized, logout);
router.get('/isAuthenticated', checkIfAuthorized, fetchUserData);

export default router;