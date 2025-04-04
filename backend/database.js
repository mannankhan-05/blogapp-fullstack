import { Sequelize } from "sequelize";

const db = new Sequelize("blogdata", "postgres", "amk@postgre", {
  host: "localhost",
  dialect: "postgres", // Make sure to install "pg" and "pg-hstore"
});

export default db;
