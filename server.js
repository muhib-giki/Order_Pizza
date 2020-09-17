require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const { MongoStore } = require("connect-mongo");
const MongoDbStore = require("connect-mongo")(session);

const PORT = process.env.PORT || 3300;

//database connection

const url = "mongodb://localhost/pizza";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;

connection
  .once("open", () => {
    console.log("Mongoose is connected");
  })
  .catch((err) => {
    console.log("connection failed...");
  });

//session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

//Session config

app.use(
  session({
    secret: process.env.CK,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
  })
);

app.use(flash());

//Asset

app.use(express.static("public"));
app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web.js")(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
