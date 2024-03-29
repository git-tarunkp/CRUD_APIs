const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel= require('./models/Users')

const app = express()
app.use(cors(  
{
    origin: "https://crud-ap-frontend.vercel.app",
   
    methods:["POST","GET","DELETE","PUT"]
    // ,
    // credentials:true

    // origin: 'https://crud-ap-frontend.vercel.app',
    // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // methods:["POST","GET","DELETE","PUT"]
}
    ))
app.use(express.json())

mongoose.connect('mongodb+srv://me210003075:root@cluster0.voozvxd.mongodb.net/?retryWrites=true&w=majority');


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
