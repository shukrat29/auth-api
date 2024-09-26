const express = require("express");
const connectDB = require('./config/database');
const User = require("./models/user");


const app = express();

// middleware
app.use(express.json());

app.post("/signup", async(req,res) => {
    // console.log(req.body);

    // creating a new instance of the User model or
    // Creating new user same thing
    const user = new User(req.body);

    try {
        await user.save();
        res.send("User added successfully!")
    } catch (err) {
        res.status(400).send("Error saving the user:" +err.message)
    }
 
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is running successfully on port 3000");
    });
}).catch((err) => {
    console.log("Database can not be connected");
})

