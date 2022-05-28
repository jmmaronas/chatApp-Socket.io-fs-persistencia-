const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer, Socket } = require("socket.io")
const ejs = require("ejs")

const PORT = process.env.PORT || 8080
const users = []
let usuario

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views", __dirname + "/views")
app.set("views engine", "ejs")

app.use(express.static(__dirname + "/public"))

app.get("/login", (req, res) => {
    return res.render("login.ejs")
})
app.post("/login", (req, res) => {
    const { userName } = req.body    
    return res.redirect(`/chat?userName=${userName}`)
})

app.get("/chat", (req,res)=>res.render("chat.ejs"))

const server = httpServer.listen(PORT, () => {
    console.log(`Server on port: ${server.address().port}`)
})
server.on("error", (err) => console.error(err))

io.on("connection", socket=>{
    socket.on("usuario", ({userName})=>{
        usuario= userName
        users.push({
            id:socket.id, 
            name:userName,
            avatarId: Math.floor(Math.random()*(10 - 1)+1)
        })
    })
    socket.emit("inicio", "Bienvenido")
    
    socket.broadcast.emit("nuevoUsuario", usuario)

    io.sockets.emit("users", users)
})