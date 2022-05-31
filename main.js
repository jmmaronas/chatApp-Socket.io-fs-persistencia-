const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer, Socket } = require("socket.io")
const ejs = require("ejs")
const { archivoChat, archivoJson } = require("./src/services/app.js")
const  userRouter  =require("./src/routes/userRouter.js")

const PORT = process.env.PORT || 8080
let usuario = ""

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("views", __dirname + "/views")
app.set("views engine", "ejs")

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    return res.render("login.ejs", {user:true, pass:true})
})

app.get("/chat", (req,res)=>{
    const {user, avatar}=req.query    
    res.render("chat.ejs", {user, avatar} )
})

app.use("/user", userRouter)


const server = httpServer.listen(PORT, () => {
    console.log(`Server on port: ${server.address().port}`)
})

server.on("error", (err) => console.error(err))

io.on("connection", async socket => {
    socket.on("usuario", ({ userName }) => {
        usuario = {
            userName,
            avatarId: Math.floor(Math.random() * (8 - 1) + 1)
        }
        archivoJson.save(usuario)
        io.sockets.emit("nuevoUsuario", usuario)
    })

    socket.on("mensajeCliente", async ({userName, message}) => {
        let listaUsuarios= await archivoJson.getAll()
        let datosUsuario= listaUsuarios.find(user=> user.userName===userName)
        let mensaje = {
            message
        }
        await archivoChat.save(mensaje)
        io.sockets.emit("mensajeServidor", {...datosUsuario, message})
    })

    socket.emit("inicio", await archivoChat.getAll())


    io.sockets.emit("users", await archivoJson.getAll())
})