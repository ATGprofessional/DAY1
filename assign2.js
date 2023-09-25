const express = require('express');
const app = express();

let Notes = [
    {
        "id" : 1,
        "title" : "Samsung",
        "description" : "Moblie"
    },
    {
        "id" : 2,
        "name" : "Lenevo",
        "description" : "Laptop"
    },
    {
        "id" : 3,
        "name" : "Hauwei",
        "description" : "Tablet"
    }
]

app.get('/',(req,res)=>{
    res.send("Welcome")   
}
)
app.get('/notes',(req,res)=>{
        res.send(Notes)   
   }
)

app.get('/notes/:id',(req,res) => {
        const id = req.params.id;
        for (let i = 0; i < Notes.length; i++){
            if(Notes[i].id== id){
                return res.send(Notes[i]);
            }
        }
        res.send("NOTES not found");
    });
app.listen(3030)
