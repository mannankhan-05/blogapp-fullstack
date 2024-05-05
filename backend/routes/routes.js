import { showAllUsers } from "../controller/controllers.js";

import express from "express";
const router = express.Router();

router.get("/", showAllUsers);

export default router;
