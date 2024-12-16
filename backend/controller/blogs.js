import {
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  insertBlog,
  updateBlog,
  deleteBlog,
  display3Blogs,
  deleteBlogPicture,
} from "../model/blogs.js";

import fs from "fs";
import path from "path";
import multer from "multer";

/*
    const storage = multer.diskStorage({ ... }); 
    This line creates a storage configuration 
    object for Multer, a middleware used for handling 
    multipart/form-data (file uploads) in Node.js.
*/
const storage = multer.diskStorage({
  /*  This specifies the destination directory where the uploaded files will be stored. Here, all files are stored in the "Images" directory.
    req: The request object.
    file: Information about the uploaded file.
    cb: Callback function to specify the destination. cb(null, "Images") indicates no error (null) and the destination directory is "Images". */
  destination: (req, file, cb) => {
    cb(null, "Images");
  },

  /*  This specifies how the uploaded file should be named.
    cb(null, Date.now() + path.extname(file.originalname));: Creates a unique filename using the current timestamp (via Date.now()) 
    combined with the file's original extension (path.extname(file.originalname)). This helps avoid filename collisions. */
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// This line initializes Multer with the previously defined storage configuration.
const upload = multer({ storage: storage });

export const showAllBlogs = (req, res) => {
  getAllBlogs((err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(result);
    }
  });
};

export const displayBlogById = (req, res) => {
  const id = req.params.id;
  getBlogById(id, (err, result) => {
    if (err) {
      res.sendStatus(500);
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

export const addBlog = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.sendStatus(500);
    }

    const { title, author, description } = req.body;
    const userId = req.params.id;
    // sets the picture variable to the uploaded file's filename if a file was uploaded, otherwise it sets it to null.
    const picture = req.file ? req.file.filename : null;

    insertBlog(title, author, description, picture, userId, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
};

export const editBlog = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.sendStatus(500);
    }

    const id = req.params.id;
    const { title, author, description } = req.body;
    const picture = req.file ? req.file.filename : null;
    updateBlog(title, author, description, picture, id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
};

export const removeBlog = (req, res) => {
  const id = req.params.id;

  deleteBlogPicture(id, (err, blog) => {
    if (err || !blog) {
      return res.sendStatus(500);
    }

    deleteBlog(id, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (blog.b_picture) {
          // Construct the correct file path
          const imageName = blog.b_picture.split("/").pop();
          const imagePath = path.join("Images", imageName);
          console.log(`deleted the image from images folder : ${imagePath}`);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Failed to delete image file: ${imagePath}`, err);
            }
          });
        }
        res.sendStatus(200);
      }
    });
  });
};
