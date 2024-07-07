import { Router } from "express";
import { isAuthenticated } from "../middlewares/authenticateToken";
import { createStudents } from "../controllers/createStudent.controller";
import { editStudent } from "../controllers/editStudent.controller";
import { deleteStudent } from "../controllers/deleteStudent.controller";
const studentRouter = Router();

studentRouter.post("/", isAuthenticated, createStudents);
studentRouter.put("/:id", isAuthenticated, editStudent);
studentRouter.delete("/:id", isAuthenticated, deleteStudent);

export default studentRouter;
