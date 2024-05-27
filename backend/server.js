import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import path from "path";
const app = express();

import { fileURLToPath } from "url";

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

app.use(cors());

// Serve static files from the "Images" directory
app.use("/Images", express.static(path.join(__dirname, "Images")));

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Note : middlewares are executed sequentially.
