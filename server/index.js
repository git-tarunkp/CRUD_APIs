const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel= require('./models/Users')

const app = express()
app.use(cors(
    
{
    origin:["http://localhost:5173"],
    methods:["POST","GET","DELETE","PUT"],
    credentials:true

}
    ))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud');


app.get('/', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.get('/getUser/:id', (req, res) => {
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{name:req.body.name,
        email:req.body.email,
        age:req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err)) 
})
 
app.delete('/deleteuser/:id', (req, res) => {
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err)) 
})




app.post("/createUser", (req,res)=>{
     UserModel.create(req.body)
     .then(users=> res.json(users))
     .catch(err=>res.json(err))
    
})


app.listen(3001, () => {
    console.log("Server is Running");
})
