"use strict";

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
dotenv.config({ path: "./secret.env" });

const express = require("express");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const languageRouter = require("./routes/languageRouter");
const apiRouter = require("./routes/api/apiRouter");

const langRedirectController = require("./controllers/langRedirectController");

const enforce = require("express-sslify");
const stripe = require("./utils/stripe");

const app = express();
if (process.env.ENVIROMENT != "local") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Handlebars Config
app.engine(
  ".html",
  engine({
    extname: ".html",
    helpers: {
      eq: (a, b) => a === b,
      or: (...args) => args.slice(0, -1).some(Boolean),
    },
  })
);
app.set("view engine", ".html");
app.set("views", "./views");

app.use("/api/v1", apiRouter);

app.use("/:lang", langRedirectController.languageRedirectCreator(false), languageRouter);

app.use("/", langRedirectController.languageRedirectCreator(true));

const port = process.env.PORT || 5500;

app.listen(port, async () => {
  await mongoose.connect(process.env.MONGODB_SERVER);
  await stripe.init();
  console.log(`server is runing at port http://127.0.0.1:${port}`);
});
