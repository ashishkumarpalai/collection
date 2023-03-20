const express=require("express")
const {Server}=require("socket.io")
const http=require("http")

const app =express()

const httpServer=http.createServer(app)

httpServer.listen(8000)

const wss=new Server(httpServer)

let online=0

wss.on("connection",(socket)=>{
    online+=1
    socket.emit("message","hellow from server")
    socket.broadcast.emit("message",`total users:"${online}`)
    
    socket.on("disconnect",()=>{
        online-=1
        socket.broadcast.emit("message",`total users:"${online}`)
    })

    if(online===5){
        wss.emit("message","heavy load on server")
    }
})

app.get("/",(req,res)=>{
    res.send("Chat Application")
})
app.get("/contact",(req,res)=>{
    res.send("contact Application")
})




//====================================broadcasting
// const express=require("express")
// const {Server}=require("socket.io")
// const http=require("http")

// const app =express()

// const httpServer=http.createServer(app)

// httpServer.listen(8000)

// const wss=new Server(httpServer)

// wss.on("connection",(socket)=>{
//     console.log("client connected")
    

//     socket.on("message",(data)=>{
//         console.log(data)
//         socket.emit("message","hellow from server")
//         socket.broadcast.emit("message","new clint join the chat")
//     })
    
// })

// app.get("/",(req,res)=>{
//     res.send("Chat Application")
// })
// app.get("/contact",(req,res)=>{
//     res.send("contact Application")
// })

// =================================sorcket.io
// const express=require("express")
// const {Server}=require("socket.io")
// const http=require("http")

// const app =express()

// const httpServer=http.createServer(app)

// httpServer.listen(8000)

// const wss=new Server(httpServer)

// wss.on("connection",(socket)=>{
//     console.log("client connected")
    

//     socket.on("message",(data)=>{
//         console.log(data)
//         socket.emit("message","helloo from server")
//     })
//     socket.on("age",(age)=>{
//         console.log(age)
        
//     })
//     socket.on("bye",(msg)=>{
//         console.log(msg)
//     })
// })

// app.get("/",(req,res)=>{
//     res.send("Chat Application")
// })
// app.get("/contact",(req,res)=>{
//     res.send("contact Application")
// })


// app.listen(7600,()=>{
//     console.log("Listining on port 7600")
// })







// =================step -2 heare we used callback insted app 



// const express=require("express")
// const {Server}=require("socket.io")
// const http=require("http")

// // const app =express()

// const httpServer=http.createServer((req,res)=>{
   

//     if(req.url==="/about"){
//         res.end("About Page")
//     }else{
//         res.end("hello")
//     }
// })
// httpServer.listen(8000)
// const wss=new Server(httpServer)

// // app.get("/",(req,res)=>{
// //     res.send("Chat Application")
// // })

// // app.listen(7600,()=>{
// //     console.log("Listining on port 7600")
// // })










//==================================step-1

// const express=require("express")

// const app =express()

// app.get("/",(req,res)=>{
//     res.send("Chat Application")
// })

// app.listen(7600,()=>{
//     console.log("Listining on port 7600")
// })