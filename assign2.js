const express = require('express');
const app = express();

let Note = ["Note1","Note2","Note3"]
app.get('/',(req,res)=>{
        res.send(Note)   
   }
)

app.listen(3030)