// import db from "../database.js";

// // to get all blogs from the database
// export const getAllBlogs = (results) => {
//   db.query("select * from blogs", (err, result) => {
//     if (err) {
//       results(err, null);
//       console.log("unable to fetch blogs from database");
//     } else {
//       results(null, result.rows);
//     }
//   });
// };

// export const getBlogById = (id, results) => {
//   db.query("select * from blogs where b_id = $1", [id], (err, result) => {
//     if (err) {
//       results(err, null);
//     } else {
//       const blogs = result.rows.map((blog) => {
//         if (blog.b_picture) {
//           blog.b_picture = `http://localhost:3000/images/${blog.b_picture}`;
//         }
//         return blog;
//       });
//       results(null, blogs);
//     }
//   });
// };

// // when i delete the blog. the picture of that blog should be deleted from images folder.
// export const deleteBlogPicture = (id, results) => {
//   db.query("select * from blogs where b_id = $1", [id], (err, result) => {
//     if (err) {
//       results(err, null);
//     } else {
//       const blog = result.rows[0];
//       if (blog && blog.b_picture) {
//         blog.b_picture = `http://localhost:3000/images/${blog.b_picture}`;
//       }
//       results(null, blog);
//     }
//   });
// };

// export const getUserBlogs = (id, results) => {
//   db.query(
//     "SELECT * FROM blogs WHERE user_blog_id = $1",
//     [id],
//     (err, result) => {
//       if (err) {
//         results(err, null);
//       } else {
//         // Prepend the image URL path to each blog entry
//         // this line processes the rows returned by the query.
//         // The map function is used to iterate over each blog entry and modify it.
//         const blogs = result.rows.map((blog) => {
//           if (blog.b_picture) {
//             // If b_picture is present, it prepends the URL path http://localhost:3000/images/ to the image filename, creating a full URL to access the image.
//             blog.b_picture = `http://localhost:3000/images/${blog.b_picture}`;
//           }
//           // return blog: Returns the modified blog entry.
//           return blog;
//         });
//         results(null, blogs);
//       }
//     }
//   );
// };

// // to display 3 blogs on main page
// export const display3Blogs = (results) => {
//   db.query("select * from blogs limit 3", (err, result) => {
//     if (err) {
//       results(err, null);
//     } else {
//       // Prepend the image URL path to each blog entry
//       const blogs = result.rows.map((blog) => {
//         if (blog.b_picture) {
//           blog.b_picture = `http://localhost:3000/images/${blog.b_picture}`;
//         }
//         return blog;
//       });
//       results(null, blogs);
//     }
//   });
// };

// // to insert a new blog in the database
// export const insertBlog = (
//   title,
//   author,
//   description,
//   picture,
//   userId,
//   results
// ) => {
//   db.query(
//     "insert into blogs(b_title, b_author, b_description, b_picture, user_blog_id) values($1, $2, $3, $4, $5)",
//     [title, author, description, picture, userId],
//     (err, result) => {
//       if (err) {
//         console.log("facing error on adding a new blog.");
//         results(err, null);
//       } else {
//         console.log("blog is inserted successfully.");
//         results(null, result);
//       }
//     }
//   );
// };

// // to update the existing blog in the database using id of the blog
// export const updateBlog = (
//   title,
//   author,
//   description,
//   picture,
//   id,
//   results
// ) => {
//   db.query(
//     "update blogs set b_title = $1, b_author = $2, b_description = $3, b_picture = $4 where b_id = $5",
//     [title, author, description, picture, id],
//     (err, result) => {
//       if (err) {
//         console.log("error occured while updating the data : ", err);
//         results(err, null);
//       } else {
//         results(null, result);
//       }
//     }
//   );
// };

// // to delete the existing blog in the database using id of the blog
// export const deleteBlog = (id, results) => {
//   db.query("delete from blogs where b_id = $1", [id], (err, result) => {
//     if (err) {
//       console.log("error occured while deleting the blog.");
//       results(err, null);
//     } else {
//       results(null, result.rows);
//     }
//   });
// };

import { DataTypes, Model } from "sequelize";
import db from "../database.js";

class blog extends Model {}

blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "blog",
    timestamps: true,
  }
);

export default blog;
