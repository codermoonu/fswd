const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const connectDB = require('./db');
const Register = require('./models/register');
const path = require('path');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');


connectDB();


const viewsPath = path.join(__dirname, '../templetes/views');
app.set('views', viewsPath);
app.set('view engine', 'hbs');


const publicPath = path.join(__dirname, '../templetes/public');
app.use(express.static(publicPath));

app.get('/', (req, res) => {


    res.render('index');
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password, regno } = req.body;
        const newUser = new Register({ username, email, password, regno });
        await newUser.save();
        res.send("✅ Registration Successful!");
    } catch (error) {
        res.status(500).send("❌ Error saving to database: " + error.message);
    }
});

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
