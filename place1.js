// http express server to perform crud on notes.json file

const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const port = 3000;

function getNotes(){
    const data = fs.readFileSync('notes.json','utf-8');
    return  JSON.parse(data);
}

function saveNotes(data){
    return fs.writeFileSync('notes.json',JSON.stringify(data));
}

app.get('/',(req,res) => {
    return res.sendFile(__dirname + "/index.html")
    // res.send("Hello World");
});

app.get('/notes',(req,res)=>{
    let notes = getNotes()
    return res.send(notes)
})

app.get('/notes/:id',(req,res) => {
    let id = Number(req.params.id);

    let notes = getNotes()

    for(let i = 0;i<notes.length;i++){
        if(notes[i].id == id){
            return res.send(notes[i])
        }
    }
    return res.status(404).send('No Notes Found')
})

app.post('/notes',(req,res) => {
    let {title,description} = req.body;

    if(!title || !description){
        return res.status(400).send('Please Enter Title and Description')
    }

    let notes = getNotes();

    let newNote = {
        id: notes.length + 1,
        title,
        description
    }

    notes.push(newNote)

    saveNotes(notes)

    return res.send(newNote)
})

app.put('/notes/:id',(req,res) => {
    let id = req.params.id;
    let {title,description} = req.body;

    if(!title || !description){
        return res.status(400).send('Please Enter Title and Description')
    }

    let notes = getNotes();

    for(let i = 0;i<notes.length;i++){
        if(notes[i].id == id){
            notes[i].title = title;
            notes[i].description = description;
            saveNotes(notes);
            return res.send(notes[i])
        }
    }

    return res.status(404).send('No Notes Found')
})

app.delete('/notes/:id',(req,res) => {
    let id = req.params.id;
    
    let notes = getNotes();
    
    for(let i = 0;i<notes.length;i++){
        if(notes[i].id == id){
            notes.splice(i,1);
            saveNotes(notes);
            return res.send(notes[i])
        }
    }
    
    return res.status(404).send('No Notes Found')
})

app.use((req,res) => {
    return res.status(404).send('Not Found')
})

app.listen(3000,(req,res) => {
    console.log('Server Started');
})


