import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getjobById, postJob } from '../controllers/job_cintroller.js';

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);   
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/get/:id").get(isAuthenticated,getjobById);

export default router;