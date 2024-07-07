import { Router } from "express";
import {
  getAllStudents,
  getuserDetails,
} from "../controllers/getUser.controller";
import { isAuthenticated } from "../middlewares/authenticateToken";
const router = Router();

router.get("/", isAuthenticated, getuserDetails);
router.get("/getstudents", isAuthenticated, getAllStudents);

export default router;
