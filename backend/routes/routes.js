import {
  showAllUsers,
  addUser,
  logInUser,
  showAllBlogs,
  addBlog,
} from "../controller/controllers.js";

import express from "express";
const router = express.Router();

router.get("/", showAllUsers);

router.post("/registerUser", addUser);

router.post("/loginUser", logInUser);

router.get("/allBlogs", showAllBlogs);

router.post("/postBlog", addBlog);

export default router;
