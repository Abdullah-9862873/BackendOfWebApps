import express from "express";
import {getAllUsers, registeruser, getMyProfile, loginUser, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.get("/all", getAllUsers)

router.post("/new", registeruser);

router.get("/me",isAuthenticated, getMyProfile);

router.get("/login", loginUser);

router.get("/logout", logout);

export default router;