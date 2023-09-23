const express = require('express');
const app = express();

let Note = ["Note1","Note2","Note3"]
app.get('/',(req,res)=>{
        res.send(Note)   
   }
)
app.get('/notes/:id',(req,res) => {
    const id = req.params.id;
    for (let i = 0; i < NOTES.length; i++){
        if(NOTES[i].id==id){
            res.send(NOTES[i]);
        }
    }
    res.send("NOTES not found");
 }
)
app.listen(3030)
