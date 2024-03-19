const express = require("express");
const app = express();
const port = 3000;
const ToDo = require("./routes/ToDo-routes.js");
const User = require("./routes/User-routes.js");
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

app.use(cors());

// Mount ToDo routes
app.use("/api/todo", ToDo);
app.use("/api/user", User);

async function main() {
  await mongoose.connect(
    "mongodb+srv://chhaya1220193:8jLuWDxsAdBloX0F@cluster0.3cwgr1a.mongodb.net/mydb"
  );
  console.log("Successfully connected to the database");
}

main().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

//8jLuWDxsAdBloX0F
//chhaya1220193
