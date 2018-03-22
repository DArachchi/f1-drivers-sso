// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create Driver schema
var DriverSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  }
});

// Create the Driver model with the DriverSchema
var Driver = mongoose.model("Driver", DriverSchema);

// Export the model
module.exports = Driver;