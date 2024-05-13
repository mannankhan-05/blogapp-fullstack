import {
  showAllUsers,
  addUser,
  editUser,
  logInUser,
  showAllBlogs,
  addBlog,
  showSingleBlog,
  editBlog,
  removeBlog,
} from "../controller/controllers.js";

import express from "express";
const router = express.Router();

router.get("/", showAllUsers);

router.post("/registerUser", addUser);

router.put("/updateUser/:id", editUser);

router.post("/loginUser", logInUser);

router.get("/allBlogs", showAllBlogs);

router.get("/blog/:id", showSingleBlog);

router.post("/postBlog", addBlog);

router.put("/updateBlog/:id", editBlog);

router.delete("/deleteBlog/:id", removeBlog);

export default router;
