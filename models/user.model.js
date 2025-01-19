const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [3, 'Username must be at least 3 characters long'],
        maxLength: [50, 'Username must not be longer than 50 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [13, 'Email must be at least 13 characters long'],
        maxLength: [50, 'Email must not be longer than 50 characters'],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [5, 'Password must be at least 5 characters long'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
