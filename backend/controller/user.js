// import {
//   getAllUsers,
//   insertUser,
//   updateUser,
//   signInUser,
// } from "../model/users.js";

import express from "express";
import user from "../model/user.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const addUser = async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;

  // Hashing the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await user
    .create({
      firstName,
      lastName,
      age,
      email,
      password: hashedPassword,
    })
    .then((addedUser) => {
      console.log(`User created with email : ${email}`);
      res.json(addedUser);
    })
    .catch((err) => {
      console.log(`Error creating user with email : ${email}. Error : ${err}`);
      res.sendStatus(500);
    });
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, age } = req.body;

  await user
    .update(
      { firstName, lastName, age },
      {
        where: {
          id,
        },
      }
    )
    .then(() => {
      console.log(`User with ID : ${id} updated successfully`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error updating user with ID : ${id}. Error : ${err}`);
      res.sendStatus(500);
    });
};

export const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const existingUser = await user.findOne({
      where: { email: email },
    });

    if (!existingUser) {
      console.log("Email is not found !.");
      return res.status(500).json({ error: "Error logging in user" });
    }

    // Compare the passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      console.log(`User is logged In as ${existingUser.name}`);
      res.json(existingUser);
    } else {
      console.log("Invalid Password !.");
      return res.status(401).json({ error: "Invalid Password" });
    }
  } catch (err) {
    console.log("Error logging in user");
    res.status(500).json({ error: "Error logging in user" });
  }
};
