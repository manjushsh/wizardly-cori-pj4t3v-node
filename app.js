const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const iGenRouter = require("./routes/igen");
// const scrapeRouter = require("./routes/scrape");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/igen", iGenRouter);
// app.use("/scrape", scrapeRouter);

const listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
