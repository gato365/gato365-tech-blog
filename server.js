require("dotenv").config();
const express = require("express");
// Express Handlebars is a templating engine that allows you to use handlebars templates with Express.
const expressHandlebars = require("express-handlebars");
// cookie-parser is a middleware that parses cookies attached to the client request object.
const cookieParser = require("cookie-parser");

// Import the sequelize connection
const sequelize = require("./config/connection");
// Import the routes
const mainRouter = require("./controllers");
const pathRouter = require("./controllers/homePageRoutes");

const port = process.env.PORT || 3001;


// Create a new express app instance
const app = express();