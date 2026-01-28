const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URI;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully Connected to Database!!"))
  .catch((error) => console.error("Error connecting to Database", error));
