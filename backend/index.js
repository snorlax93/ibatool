require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();
const categoriesRoutes = require("./routes/categories");
const commentsRoutes = require("./routes/comments");
const episodesRoutes = require("./routes/episodes");
const logsRoutes = require("./routes/logs");
const topicsRoutes = require("./routes/topics");
const usersRoutes = require("./routes/users");

app.use("/api/categories", categoriesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/episodes", episodesRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/users", usersRoutes);
app.use(express.json());

app.listen(8080, () => {
  console.log(`Server Started at 8080`);
});
