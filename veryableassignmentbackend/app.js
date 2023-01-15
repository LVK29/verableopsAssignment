const express = require("express");
const mongoose = require("mongoose");
const businessRoutes = require("./routes/businessRoutes");
const opsRoutes = require("./routes/opsRoutes");
const operatorRoutes = require("./routes/operatorRoutes");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
//const business = require("./models/business");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB CONNECTION FAILED!");
  });

//body parser
app.use(bodyParser.json());

//my Routes
app.use("/api", businessRoutes);
app.use("/api", operatorRoutes);
app.use("/api", opsRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
