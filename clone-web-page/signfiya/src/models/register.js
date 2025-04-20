const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    regno: String
});

module.exports = mongoose.model('Register', registerSchema);
