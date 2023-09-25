const { prototype } = require('events');
const express = require('express')
const fs = require('fs');
const { stringify } = require('querystring');
const app = express();
app.use(express.json());

function getdata(){
    const data = fs.readFileSync('notes.json','utf-8')
    return JSON.parse(data)
}

function savedata(data){
    return fs.writeFileSync('notes.json',JSON.stringify(data))
}

app.get('/',(req,res)=>{
    return res.send(__dirname + '/place.js')

})

app.get('/notes',(req,res)=>{
    let notes = getdata()
    return res.send(notes)     
})

app.get('/notes/:id',(req,res)=>{
    let id= req.params.id

    let notes = getdata();
    
    for(var i=0;i<notes.length;i++){
        if(notes[i].id == id)
        return res.send(notes[i])
    }
    return res.status(404).send('No Data Found')
})

app.post('/notes',(req,res)=>{
    
    let {title,description} = req.body;

    if(!title || !description)
    return res.status(404).send("Enter Title and Description")

    let notes = getdata();

    let newNote={ 
        id: notes.length+1 ,
        title ,
        description
    }
    notes.push(newNote)
    savedata(notes)
    return res.send(newNote)
})

app.put('/notes/:id',(req,res)=>{
    let id = req.params.id

    let{title,description}=req.body
    if(!title || !description)

    return res.status(404).send("Enter Title and Description")

    let notes = getdata();

    for (let i=0;i<notes.length;i++){
        if(notes[i].id == id)
        {
            notes[i].title = title;
            notes[i].description = description;
            savedata(notes)
            return res.send(notes[i])
        }
    }
    return res.status(404).send(`Data Not found with ID ${id}`)
})

app.delete('/notes/:id',(req,res)=>{
    let id = req.params.id;
    let notes = getdata();
    for(var i=0;i<notes.length;i++)
    {
        if(notes[i].id == id)
        {
            notes.splice(i,1)
            savedata(notes)
            return res.send(notes[i])
        }
    }
    return res.status(404).send('No Data Found')
})

app.use((req,res)=>{
    return res.status(404).send('Page not Found')
})

const port = 3000
app.listen(3000,(req,res)=>{
    console.log(`Running in port ${port}`)
})