import {
  getAllUsers,
  insertUser,
  signInUser,
  getAllBlogs,
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

export const logInUser = (req, res) => {
  const { email, password } = req.body;
  signInUser(email, password, res, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
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
