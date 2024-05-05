import db from "../database.js";

db.connect();

// to get all users
export const getAllUsers = (results) => {
  db.query("select * from users", (err, result) => {
    if (err) {
      results(err, null);
    } else {
      results(null, result.rows);
    }
  });
};

// to insert new user
export const insertUser = (
  firstname,
  lastname,
  age,
  email,
  password,
  results
) => {
  db.query(
    "insert into users(u_firstname, u_lastname, u_age, u_email, u_password) values($1, $2, $3, $4, $5)",
    [firstname, lastname, age, email, password],
    (err, result) => {
      if (err) {
        results(err, null);
      } else {
        results(null, result);
      }
    }
  );
};

// to login an existing user
export const signInUser = (email, password, results) => {
  db.query(
    "select * from users where u_email = $1 and u_password = $2",
    [email, password],
    (err, result) => {
      if (result.length > 0) {
        console.log("User is found!");
        // Access the first name of the user
        const firstName = result[0].u_firstname;
        console.log("First Name:", firstName);
        results(null, result);
      } else {
        console.log("User is not found!");
        results(err, null);
      }
    }
  );
};
