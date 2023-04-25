import express from 'express';
import {
  createJob,
  getAllJobs,
  getOneJob,
  updateJob,
  deleteJob,
} from "../controllers/jobControllers.js";
import { authorizeRecruiter, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createJob);

router.route("/alljobs").get(getAllJobs);

router.route("/job/:id").get(getOneJob);

router.route("/job/:id").put(isAuthenticated, updateJob);

router.route("/job/:id").delete(isAuthenticated, deleteJob);


export default router;
