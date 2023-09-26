//import express

const express = require('express');

//create express app

const app = express();

//use express.json() middleware

app.use(express.json());

//create a sample todo list array

const todoList = [
    {
        id: 1,
        title: 'Learn Node.js',
        completed: false
    },
    {
        id: 2,
        title: 'Learn Express',
        completed: false
    },
    {
        id: 3,
        title: 'Learn MongoDB',
        completed: false
    }
];
app.get('/',(req,res)=>{
    return res.send("Hello World");
})
//create a GET route to fetch all todos

app.get('/todos', (req, res) => {
    res.send(todoList);
});

//create a GET route to fetch a single todo

app.get('/todos/:id',(req,res)=>{
    const id = req.params.id
    for(var i=0;i<todoList.length;i++){
        if(todoList[i].id == id){
            return res.send(todoList[i])
    }
}
    return res.status(404).send('No Such ID Exist')
})
//create a POST route to add a new todo
app.post('/todos',(req,res)=>{
    const id = req.params.id
    let {title,completed} = req.body
    let item={
        id : todoList.length+1,
        title,
        completed : false
    }
    todoList.push(item)
    return res.send(item)
})

//create a PUT route to update a todo

app.put('/todos/:id',(req,res)=>{
    let id = req.params.id
    for(var i=0;i<todoList.length;i++){
        if(todoList[i].id==id){
            todoList[i].title = title
            return res.send(todoList[i])
    }
 }
         return res.status(404).send('No Such Data Exist')

})
//create a DELETE route to delete a todo

app.delete('/todos/:id',(req,res)=>{
    const id = Number(req.params.id)
    for(var i=0;i<todoList.length;i++){
        if(todoList[i].id === id){
            	todoList.splice(i,1) 
                return res.send(todoList[i])          
             }
            }
            return res.status(404).send('No Such Data Exist')
})
// create a PATCH/PUT route to update a todo status
app.patch('/todo/:id',(req,res)=>{
    let id = req.params.id
    for(let i=0;i<todoList.length;i++){
        if(todoList[i].id==id){
            todoList[i].completed=!todoList[i].completed
            return res.send(todoList[i])
        }
    }
    res.status(404).send(`No todo with id: ${id} is found`)
})

// create a fallback route for all other routes.
app.use((req,res)=>{
    return res.status(503).send({error:'Page Not Found'})
})
//listen on port 3000
const port = 3000
app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});
