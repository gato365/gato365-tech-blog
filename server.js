require("dotenv").config();
const express = require("express");
// Express Handlebars is a templating engine that allows you to use handlebars templates with Express.
const handlebars = require("express-handlebars");
// cookie-parser is a middleware that parses cookies attached to the client request object.
// const cookieParser = require("cookie-parser");

// Import the sequelize connection
const sequelize = require("./config/connection");
// Import the routes
const mainRouter = require("./controllers");
// Import the helpers
// const homePageRoutes = require("./controllers/homePageRoutes");
// const helpers = require("./utils/helpers");


// Create a new express app instance
const app = express();
// Set up Handlebars.js engine with custom helpers
const hbs = handlebars.create();


app.use('/', mainRouter);
// Set the port
const PORT = process.env.PORT || 3001;


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");




// Set up the Express app to handle data parsing
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());










// Use the main router
// app.engine("handlebars", hbs.engine); 
// app.set('view engine', 'handlebars');
app.use(mainRouter);


// Sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Listening on http://localhost:" + PORT)
    });
});

