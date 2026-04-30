import express from "express";
import { suggestTask, summarizeTasks } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/suggest", suggestTask);
router.post("/summary", summarizeTasks);

export default router;
