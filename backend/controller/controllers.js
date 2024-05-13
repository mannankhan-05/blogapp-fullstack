import {
  getAllUsers,
  insertUser,
  updateUser,
  signInUser,
  getAllBlogs,
  insertBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../model/models.js";

export const showAllUsers = (req, res) => {
  getAllUsers((err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
};

export const addUser = (req, res) => {
  const { firstname, lastname, age, email, password } = req.body;
  insertUser(firstname, lastname, age, email, password, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
      console.log("User is registered successfully!");
    }
  });
};

export const editUser = (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, age, email, password } = req.body;
  updateUser(firstname, lastname, age, email, password, id, (err, result) => {
    if (err) {
      console.log("an error occured while updating!.");
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

export const logInUser = (req, res) => {
  const { email, password } = req.body;
  signInUser(email, password, res, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
      console.log("User is LoggedIn successfully!");
    }
  });
};

export const showAllBlogs = (req, res) => {
  getAllBlogs((err, result) => {
    if (err) {
      res.send(500);
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
  const { title, author, description, date } = req.body;
  insertBlog(title, author, description, date, (err, result) => {
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
