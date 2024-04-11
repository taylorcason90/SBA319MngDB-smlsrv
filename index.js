const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json()); //pasre json bodies

const PORT = process.env.PORT || 7000

// schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,

}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)

// APIs below
//read 

// "http://localhost:7000/"

app.get("/", async (req, res) => {
    const data = await userModel.find({})

    res.json({ success: true, data: data })
})

//create data /save to mongo db
// "http://localhost:7000/create"

/*
{
    name,
    email,
    mobile
}
*/


app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()


    res.send({ success: true, message: "data save successfully", data : data })
});



    
    

app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    const data = await userModel.updateOne({ _id : _id }, rest)
    res.send({ sucess: true, message: "data updated successfully", data : data })
})


// "http://localhost:7000/delete/id"

app.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id
    console.log(id)
const data = await userModel.deleteOne({_id : id})
res.send({ success: true, message: "data deleted successfully", data : data })

})

mongoose.connect("mongodb+srv://Admin-perscholas:zQbVuunKlNcD5FzT@mongopractice.qgjr6yr.mongodb.net/crudoperation")
    .then(() => {
        console.log("connect to DB")

        app.listen(PORT, () => console.log("Server is running"))
    })
    .catch((err) => {
        console.error("Error connecting to Mongo DB:", err);
    });
