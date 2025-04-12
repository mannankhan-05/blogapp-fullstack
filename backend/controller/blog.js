import blog from "../model/blog.js";
import fs from "fs";
import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const showAllBlogs = async (req, res) => {
  try {
    const blogs = await blog.findAll();
    res.json(blogs);
  } catch (err) {
    console.log("Error fetching all blogs:", err);
    res.sendStatus(500);
  }
};

export const displayBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const foundBlog = await blog.findByPk(id);
    res.json(foundBlog);
  } catch (err) {
    console.log("Error fetching blog by id:", err);
    res.sendStatus(500);
  }
};

export const displayUserBlogs = async (req, res) => {
  try {
    const userId = req.params.id;
    const userBlogs = await blog.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(userBlogs);
  } catch (err) {
    console.log("Error fetching user blogs:", err);
    res.sendStatus(500);
  }
};

export const show3Blogs = async (req, res) => {
  try {
    const blogs = await blog.findAll({
      limit: 3,
    });
    res.json(blogs);
  } catch (err) {
    console.log("Error fetching 3 blogs:", err);
    res.sendStatus(500);
  }
};

export const addBlog = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.sendStatus(500);
    }

    try {
      const { title, author, description } = req.body;
      const userId = req.params.id;
      const picture = req.file ? req.file.filename : null;

      await blog.create({
        title,
        author,
        description,
        picture,
        userId,
      });
      res.sendStatus(200);
    } catch (err) {
      console.log("Error creating blog:", err);
      res.sendStatus(500);
    }
  });
};

export const editBlog = (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.sendStatus(500);
    }

    try {
      const id = req.params.id;
      const { title, author, description } = req.body;
      const picture = req.file ? req.file.filename : null;

      await blog.update(
        { title, author, description, picture },
        {
          where: { id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log("Error updating blog:", err);
      res.sendStatus(500);
    }
  });
};

export const removeBlog = async (req, res) => {
  try {
    const id = req.params.id;

    // First find the blog to get picture info
    const blogToDelete = await blog.findByPk(id);

    if (!blogToDelete) {
      return res.sendStatus(500);
    }

    // Delete the blog
    await blog.destroy({
      where: { id },
    });

    // Delete associated picture if exists
    if (blogToDelete.picture) {
      const imagePath = path.join("Images", blogToDelete.picture);
      console.log(`deleted the image from images folder : ${imagePath}`);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete image file: ${imagePath}`, err);
        }
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log("Error deleting blog:", err);
    res.sendStatus(500);
  }
};
