import express from "express";
import { register, login, logout } from "../controllers/user_controller.js";
import { updateProfile } from "../controllers/user_controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, registerCompany, getCompanyById, updateCompany } from "../controllers/company_controller.js";

const router = express.Router();
router.route("/registercompany").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated, updateCompany);
export default router;
