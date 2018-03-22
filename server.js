// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Requiring driver model
var Driver = require("./models/driver.js");

// Initial express
var app = express();
var PORT = process.env.PORT || 8081;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Make public a static directory
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost:27017/f1-drivers");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
	console.log("Mongoose connection successful.");
});

// GET route to pull drivers from database
app.get("/drivers", function(req, res) {
	Driver.find({}, function(error, drivers) {
		if (error) {
			res.send(error);
		}
		else {
			res.json(drivers);
		}
	})
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});