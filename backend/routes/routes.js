import { showAllUsers, addUser, logInUser } from "../controller/controllers.js";

import express from "express";
const router = express.Router();

router.get("/", showAllUsers);

router.post("/registerUser", addUser);

router.post("/loginUser", logInUser);

export default router;
