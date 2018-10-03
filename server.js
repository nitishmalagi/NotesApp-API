const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

//connecting to DB
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => console.log('Successfully established DB connection'))
    .catch((err) => {
        console.log('Could not establish DB connection', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the notes app" })
});


// Require Notes routes
require('./app/routes/note.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is running at Port-3000")
});
