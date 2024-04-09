const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json()); //pasre json bodies

const PORT = process.env.PORT || 7000

// schema
const schemaData = mongoose.Schema({
    name :String,
    email : String,
    mobie : Number,

}, {
    timestamps : true
})

const userModel = mongoose.model("user",schemaData)
//read 

app.get("/",async(req,res)=>{
    const data = await userModel.find({})

    res.json({success : true, data : data})
    })

    //create data /save to mongo db
    app.post("/create",(req,res)=>{
        console.log(req.body)

        res.send({success : true, message : "data save successfully" })
    });

    mongoose.connect("mongodb+srv://Admin-perscholas:zQbVuunKlNcD5FzT@mongopractice.qgjr6yr.mongodb.net/crudoperation")
.then(()=> {
    console.log("connect to DB")

    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=> {
    console.error("Error connecting to Mongo DB:", err);
});










