import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import path from "path";
import db from "./database.js";
const app = express();

// Imports the fileURLToPath function from the url module, which is used to convert a file URL to a path.
import { fileURLToPath } from "url";

//  Converts the import.meta.url (the current module's URL) to a file path and assigns it to __filename.
const __filename = fileURLToPath(import.meta.url);
// Extracts the directory name from __filename and assigns it to __dirname. This provides the current directory path, similar to CommonJS.
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

app.use(cors());

// Serves static files from the "Images" directory. Any request to /Images will be served with files from the Images directory in the file system.
app.use("/Images", express.static(path.join(__dirname, "Images")));

app.use(express.json());

app.use(router);

db.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error: " + err));

db.sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.log("Error: " + err));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

// Note : middlewares are executed sequentially.
