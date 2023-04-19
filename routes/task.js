import express from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import {isAuthenticated} from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.get("/my", isAuthenticated, getMyTasks);

router.route("/:id", isAuthenticated).put(updateTask).delete(deleteTask);

export default router;