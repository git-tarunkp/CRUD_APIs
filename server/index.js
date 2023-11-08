const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel= require('./models/Users')

const app = express()
app.use(cors(
    
{
    origin:["https://crud-ap-frontend-9fbvmwxh1-taruns-projects-f750e9da.vercel.app"],
    methods:["POST","GET","DELETE","PUT"],
    credentials:true

}
    ))
app.use(express.json())

mongoose.connect('mongodb+srv://me210003075:Tarun@@@@cluster0.jg0pnvi.mongodb.net/crud?retryWrites=true&w=majority');


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
