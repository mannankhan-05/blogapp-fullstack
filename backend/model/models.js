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
        console.log("User is found!");
        // Access the id of the user
        const id = result.rows[0].u_id;
        console.log("User Id:", id);
        res.send({ id: id }); // sending id back as json
        // results(null, result);
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
export const insertBlog = (title, author, description, date, results) => {
  db.query(
    "insert into blogs(b_title, b_author, b_description, b_date) values($1, $2, $3, $4)",
    [title, author, description, date],
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
