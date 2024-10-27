//  Import from packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//  Import routes index
const routes = require("./routes/index"); //  /index is optional

// Import middleware
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");

//  Connect to database
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

//  Create express server in app variable
const app = express();

//  For production only, uncomment allowed origins variable and pass it to cors as argument
//  const allowedOrigins = ["http:/localhost:3000/", "https:// sacha-marciano.github.io/se_project_react/"]

//  App's logic
app.use(cors()); //  All origins are allowed for tests.
app.use(express.json()); //  Convert request to JSON
app.use("/", routes); // Connect request to the righ endpoint
app.use(errors()); // Use celebrate error handling
app.use(errorHandler); // Generalized error handling

// Configure default port value and activate listening
const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
