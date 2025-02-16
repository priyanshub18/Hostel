const mongoose = require("mongoose");

const connection = mongoose
  .connect("mongodb+srv://priyanshub18:prBh1234@server-1.iuaxz.mongodb.net/new-app")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

module.exports = connection;
