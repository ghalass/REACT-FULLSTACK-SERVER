const express = require("express");
const app = express();
const cors = require("cors");
require("colors");
require("dotenv").config();

let PORT = 3001;

if (process.env.NODE_ENV == "development") {
  PORT = process.env.PORT_DEV || 3001;
}

if (process.env.NODE_ENV == "production") {
  PORT = process.env.PORT_PROD || 3001;
}

app.use(express.json());
app.use(cors());

const db = require("./models");

// TEST ROUTER
// const testRouter = require("./routes/Test");
app.get("/", (req, res) => {
  res.json("Welcome to the API.");
});

// POSTS ROUTER
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
// COMMENTS ROUTER
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
// USERS ROUTER
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
// LIKES ROUTER
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
// SITES ROUTER
const sitesRouter = require("./routes/Sites");
app.use("/sites", sitesRouter);
// SITES ROUTER
const typeparcsRouter = require("./routes/TypeParcs");
app.use("/typeparcs", typeparcsRouter);
// PARCS ROUTER
const parcsRouter = require("./routes/Parcs");
app.use("/parcs", parcsRouter);
// ENGINS ROUTER
const enginsRouter = require("./routes/Engins");
app.use("/engins", enginsRouter);
// ENGINS ROUTER
const saisieEnginsRouter = require("./routes/SaisieEngins");
app.use("/saisieengins", saisieEnginsRouter);

// SEQUELIZE
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        " OK ".green.inverse + ` SERVER IS RUNNING ON PORT : ` + `${PORT}`.green
      );
    });
  })
  .catch((err) => {
    console.log(" NOK ".red.inverse + `${err}`.red);
  });
