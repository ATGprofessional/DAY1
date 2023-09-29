//import express

const express = require('express');

//create express app

const app = express();

//use express.json() middleware

app.use(express.json());

//import mongoose
const mongoose = require('mongoose')

// create mongoose schema
let todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    }

});
//create mongoose model
const Todo = mongoose.model("Todo",todoSchema);
//create a GET route to fetch all todos
app.get('/todos',async(req.res)=>{
    const todo = await mongoose.find({})
})

//create a GET route to fetch a single todo
app.get("/todos/:id", async (req , res) => {
    

//create a POST route to add a new todo

//create a PUT route to update a todo

//create a DELETE route to delete a todo

// create a PATCH/PUT route to update a todo status

// create a fallback route for all other routes.

//listen on port 3000
const port = 3000 
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
    mongoose.connect("mongodb+srv://aariyatharshan:atggamming@cluster0.39khath.mongodb.net/")
});


