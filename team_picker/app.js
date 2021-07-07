const express = require("express");
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const cohortsRouter = require("./routes/cohorts");
const rootRouter = require("./routes/root");


const app = express();

// setup view engine
app.set("view engine", "ejs");

// setup logger
app.use(logger("dev"));

// epxress.urlencoded is used to parse the form inputs into a "body" property in our `req` object
app.use(express.urlencoded({ extended: true }));

// The static assets middleware will take all the files and directories
// at specified path and serve them publicly with their own URL
app.use(express.static(path.join(__dirname, 'public')));
// The above line connects our 'public' directory to express

// METHOD OVERWRIDE HACK
// We need to use this middleware because HTML forms only support GET and POST Verbs.
app.use(methodOverride((req, res) => {
  // check the form for a input with name attribute of `_method`
  // if it exists then let methodOverride set the current HTTP Verb
  // to whatever the value of `_method` is
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  };
}));

app.use("/cohorts", cohortsRouter);
app.use("/", rootRouter);

// tells express to spinup a http server and listen at localhost:3000
const PORT = 3000;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`listening on ${ADDRESS}:${PORT}`);
});