import {
  getAllBlogs,
  getUserBlogs,
  insertBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  display3Blogs,
} from "../model/blogs.js";

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

export const showSingleBlog = (req, res) => {
  const id = req.params.id;
  getSingleBlog(id, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
};

export const addBlog = (req, res) => {
  const { title, author, description, picture } = req.body;
  insertBlog(title, author, description, picture, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
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
