const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
        },

    description:{
            type:String,
            required:true
        }
    }
)
const Post = mongoose.model('Post',postSchema)

app.get('/',(req,res)=>{
    res.send("INSTAGRAM")
})

app.get('/page',async(req,res)=>{
    const post = await Post.find({})
    res.send(post)
})

app.get('/page/:id',async(req,res)=>{
    const id = req.params.id
    const post = await Post.findById(id)
    if(post)
    {   
        return res.send(post)
    }
    else
    {
        return res.status(404).send({message:'not found'})
    }
    
})

app.post('/page',async(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const post = new Post({
        title,
        description
    })
    const save = await post.save()
    res.send(save)
})

app.delete('/page/:id',async(req,res)=>{
    const id = req.params.id
    const del = await Post.findByIdAndDelete(id)
    if(del)
    {
        return res.send("Deleted Successfully")
    }
    else
    {
        return res.status(404).send('No Such Id Found')
    }
})

app.put('/page/:id',async(req,res)=>{
    const id=req.params.id;
    const {title,description} = req.body
    const putid = await Post.findById(id)
    if(putid)
    {
        putid.title = title,
        putid.description = description

        const post = await putid.save()
        res.send(post)
    }

})

app.listen(3030,()=>{
    console.log("Running on port 3030")
    mongoose.connect("mongodb+srv://aariyatharshan:atggamming@cluster0.39khath.mongodb.net/")
})