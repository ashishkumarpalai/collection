const express=require("express")
const {connection}=require("./db")
const { authenticate } = require("./middleware/authenticate")
const{userRouter}=require("./routes/user.router")
const app=express()

app.use(express.json())
app.get("/",authenticate,(req,res)=>{
    res.send("welcome to homepage")
})

app.use("/user",userRouter)
app.use(authenticate)
app.get("/notes",(req,res)=>{
    res.send("here is all notes...")
})

app.listen(3000,async()=>{
    try {
       await connection
       console.log("connected to the db") 
    } catch (error) {
        console.log("connection to db failed")
        console.log(error)
    }
    console.log("Running the server at 3000....")
})