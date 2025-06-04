//import express & other
const express = require("express");
//import all swagger related packages
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./apidoc.yaml");
const morgan = require("morgan");
const cors = require("cors")
const fs = require("fs");
const path = require("path");
const connectDB = require("./database/dbConnection");

// instanciate express
const app = express();
app.use(express.json());
app.use(cors())
require("dotenv").config();
app.use(morgan("dev"));
// import routes
const { poemRouter } = require("./src/routes/poem.routes");
const { userRouter } = require("./src/routes/user.routes");
const { spellRouter } = require("./src/routes/spell.routes");
const { commentRouter } = require("./src/routes/comment.routes");
const { usersubRouter } = require("./src/usersub/usersub.routes");
const { plansRouter } = require("./src/plans/plans.routes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/subscription", usersubRouter);
app.use("/api/v1/plans", plansRouter);
app.use("/api/v1/poemapi", poemRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/spell", spellRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// create routes
app.get("/", (req, res) => {
  res.end("welcome to first backend class");
});

const PORT = process.env.PORT;
connectDB();

//expose our beackend through api using server to external requests
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
