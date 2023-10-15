const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { noteRoute } = require("./routes/NoteRoutes");

const DB_URL = "mongodb+srv://wilsonjordan:Uym4NuyoXx4mNjDk@cluster0.lekjgxp.mongodb.net/?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "full-stack"
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/", noteRoute);
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});