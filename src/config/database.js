
const mongoose = require('mongoose');

const connectDB = async() => {
 await mongoose.connect("mongodb+srv://youtube:oeGRyNXj3bX7f0J9@cluster0.rwxdilc.mongodb.net/youtube");
};
module.exports = connectDB;



