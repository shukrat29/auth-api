const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lasttName: {
        type: String
    },
    firstName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: String
    },
    gender: {
        type: String
    },
});

module.exports = mongoose.model("User", userSchema);