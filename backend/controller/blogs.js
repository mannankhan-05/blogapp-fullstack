import {
  getAllBlogs,
  getUserBlogs,
  insertBlog,
  updateBlog,
  deleteBlog,
  display3Blogs,
} from "../model/blogs.js";

import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const showAllBlogs = (req, res) => {
  getAllBlogs((err, result) => {
    if (err) {
      res.send(500);
    } else {
      res.json(result);
    }
  });
};

export const displayUserBlogs = (req, res) => {
  const id = req.params.id;
  getUserBlogs(id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
};

export const show3Blogs = (req, res) => {
  display3Blogs((err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
};

export const addBlog = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.sendStatus(500);
    }

    const { title, author, description } = req.body;
    const userId = req.params.id;
    const picture = req.file ? req.file.filename : null;
    insertBlog(title, author, description, picture, userId, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
};

export const editBlog = (req, res) => {
  const id = req.params.id;
  const { title, author, description, date } = req.body;
  updateBlog(title, author, description, date, id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

export const removeBlog = (req, res) => {
  const id = req.params.id;
  deleteBlog(id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};
