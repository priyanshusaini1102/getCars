let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let path = require("path");

// require database connection file
require("./database/conn");

//import router file
let router = require("./routes/routes");

//setting up the path to serve static files
app.use(express.static(path.join(__dirname, "./public")));

//setting which view engine will this app use
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./template/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.listen(port, () => {
  console.log("server is running");
});
