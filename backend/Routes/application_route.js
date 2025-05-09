import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from '../controllers/application_controller.js';

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/getappliedjobs").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;

