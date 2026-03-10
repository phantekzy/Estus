import { Router } from "express";
import { dispatchTask } from "../controllers/job.controller.js";

const router = Router();

router.post("/dispatch", dispatchTask);

export default router;
