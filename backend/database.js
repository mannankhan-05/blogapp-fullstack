import pkg from "pg";
const { Client } = pkg;

const db = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "amk@postgre",
  database: "blogdata",
});

export default db;
