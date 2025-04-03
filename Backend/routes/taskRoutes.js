


import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createTask, deleteTask, getAllTask, taskCompleted, updateTask } from "../controllers/taskControllers.js";

const router = express.Router();


router.post("/create", isAuthenticated, createTask);
router.get("/taskList", isAuthenticated,  getAllTask);
router.put("/update/:id", isAuthenticated, updateTask);
router.delete("/delete/:id", isAuthenticated, deleteTask);
router.put("/complete/:id", isAuthenticated, taskCompleted);

export{router};