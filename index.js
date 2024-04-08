const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8080

app.get("/",(req,res)=>{
res.json({message : "Server is running on port 8080"})
})

app.listen(PORT, ()=>console.log("Server is running"))