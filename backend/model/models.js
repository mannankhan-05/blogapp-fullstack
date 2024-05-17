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

// to update the loggedIn user's information
export const updateUser = (
  firstname,
  lastname,
  age,
  email,
  password,
  id,
  results
) => {
  db.query(
    "update users set u_firstname = $1, u_lastname = $2, u_age = $3, u_email = $4, u_password = $5 where u_id = $6",
    [firstname, lastname, age, email, password, id],
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
export const signInUser = (email, password, res, results) => {
  db.query(
    "select * from users where u_email = $1 and u_password = $2",
    [email, password],
    (err, result) => {
      if (err) {
        console.log("Something Unexpected Happened!.");
        results(err, null);
        res.sendStatus(500);
      } else if (result.rows.length > 0) {
        // Access the id, firstname(0), lastname(0) of the user
        const id = result.rows[0].u_id;
        const f1 = result.rows[0].u_firstname.charAt(0);
        const f2 = result.rows[0].u_lastname.charAt(0);

        const firstname = result.rows[0].u_firstname;
        const lastname = result.rows[0].u_lastname;
        const age = result.rows[0].u_age;
        const email = result.rows[0].u_email;
        const password = result.rows[0].u_password;

        res.send({
          firstname: firstname,
          lastname: lastname,
          age: age,
          email: email,
          password: password,
          id: id,
          f1: f1,
          f2: f2,
        });

        console.log("User Id:", id);
      } else {
        console.log("User is not found!");
        res.sendStatus(404);
      }
    }
  );
};

// to get all blogs from the database
export const getAllBlogs = (results) => {
  db.query("select * from blogs", (err, result) => {
    if (err) {
      results(err, null);
      throw console.error("unable to fetch blogs from database");
    } else {
      results(null, result.rows);
    }
  });
};

// to get a single blog by id
export const getSingleBlog = (id, results) => {
  db.query("select * from blogs where b_id = $1", [id], (err, result) => {
    if (err) {
      console.log("error occured while fetchind the single blog.");
      results(err, null);
    } else {
      results(null, result.rows);
    }
  });
};

// to insert a new blog in the database
export const insertBlog = (
  title,
  author,
  description,
  date,
  picture,
  results
) => {
  db.query(
    "insert into blogs(b_title, b_author, b_description, b_date, b_picture) values($1, $2, $3, $4, $5)",
    [title, author, description, date, picture],
    (err, result) => {
      if (err) {
        console.log("facing error on adding a new blog.");
        results(err, null);
      } else {
        console.log("blog is inserted successfully.");
        results(null, result);
      }
    }
  );
};

// to update the existing blog in the database using id of the blog
export const updateBlog = (title, author, description, date, id, results) => {
  db.query(
    "update blogs set b_title = $1, b_author = $2, b_description = $3, b_date = $4 where b_id = $5",
    [title, author, description, date, id],
    (err, result) => {
      if (err) {
        console.log("error occured while updating the data.");
        results(err, null);
      } else {
        results(null, result);
      }
    }
  );
};

// to delete the existing blog in the database using id of the blog
export const deleteBlog = (id, results) => {
  db.query("delete from blogs where b_id = $1", [id], (err, result) => {
    if (err) {
      console.log("error occured while deleting the blog.");
      results(err, null);
    } else {
      results(null, result.rows);
    }
  });
};
