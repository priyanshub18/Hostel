const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const hostelModel = require("./db");
const dbConnection = require("./config");
const app = express();
var bodyParser = require("body-parser");
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Hostel Management Backend!" });
});

// app.post("/upload", (req, res) => {
//   const { name, imageUrl } = req.body;
//   if (!name || !imageUrl) {
//     return res.status(400).json({ error: "Name and imageUrl are required!" });
//   }
//   res.json({ success: true, message: "Image uploaded successfully!" });
// });
app.put("/api/admin/data", (req, res) => {
  const { hostelImages, messImage, message, hostelMessage, messMessage , hostel } = req.body;

  hostelModel.updateOne(
    {},
    {
      $set: {
        hostelImages: hostelImages,
        messImage: messImage,
        message: message,
        hostelMessage: hostelMessage,
        messMessage: messMessage,
        hostel: hostel,
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );

  console.log("Data updated in database");
  res.json({ success: true, message: "Data updated in database" });
});
app.post("/api/admin/data", async (req, res) => {
  const { hostelImages, messImages, message, hostelMessage, messMessage , hostel } = req.body;

  await hostelModel.create({
    hostelImages: hostelImages,
    messImages: messImages,
    message: message,
    hostelMessage: hostelMessage,
    messMessage: messMessage,
    hostel: hostel,
  });

  console.log("Data inserted into database");
  res.json({ success: true, message: "Data inserted into database" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
