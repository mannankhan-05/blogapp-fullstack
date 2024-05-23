import {
  getAllUsers,
  insertUser,
  updateUser,
  signInUser,
} from "../model/users.js";

import bcrypt from "bcrypt";
const salt = 10;

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

  // hashing the password using bcrypt to save the password in hashed form in the database.
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.log(err);
    }

    insertUser(firstname, lastname, age, email, hash, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
        console.log("User is registered successfully!");
      }
    });
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
