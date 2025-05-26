import { Router } from "express";
import { addSchool, listSchools } from "../controller/schoolController.js";
export const schoolRouter = Router();
schoolRouter.post("/addSchool", addSchool);
schoolRouter.get("/listSchools", listSchools);
