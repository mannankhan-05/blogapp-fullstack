import db from "../database.js";

db.connect();
export const getAllUsers = (results) => {
  db.query("select * from users", (err, result) => {
    if (err) {
      results(err, null);
    } else {
      results(null, result.rows);
    }
  });
};
