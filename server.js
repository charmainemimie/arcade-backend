const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json(),cors())

//connect to MongoDB
mongoose.connect("mongodb+srv://charmainemangorima:charmy@arcade.x6m8qlh.mongodb.net/?retryWrites=true&w=majority&appName=arcade")
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
})

//routes
app.use("/games",require("./routes/games"))
console.log("Games routes registered");

//start server
const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

