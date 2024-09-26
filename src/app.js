const express = require("express");
const connectDB = require('./config/database');
const User = require("./models/user");


const app = express();

// middleware
app.use(express.json());

// POST user to database
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


// Get user by email from database
app.get("/user",async(req, res) => {
    const userEmail = req.body.emailId;

try {
    const users = await User.find({emailId: userEmail});
    if(users.length === 0) {
        res.status(404).send("User not found");
    } else {
        res.send(users);
    }
} catch (error) {
    res.status(404).send("Something went wrong");
}
});

// Feed API- GET/Feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(404).send("Something went wrong"); 
    }

});


// Delete user from database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(404).send("Something went wrong"); 
    }
});

// Update data of the user in database
app.patch()




connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is running successfully on port 3000");
    });
}).catch((err) => {
    console.log("Database can not be connected");
})

