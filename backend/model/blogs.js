import db from "../database.js";

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
