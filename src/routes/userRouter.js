const express=require("express")
const {Router} = express
const userRouter = Router()
const {archivoChat, archivoJson} = require("../services/app.js")

userRouter.post("/login",async (req,res)=>{
    const {userName, userPass}=req.body
    const user=await archivoJson.validateUser(userName)
    if(user){
        if(user.userPass==userPass){
            return res.redirect(`/chat?user=${user.userName}&avatar=${user.avatarId}`)
        }
        return res.render("login.ejs", {user:true, pass:false})
    }
    return res.render("login.ejs", {user:false, pass:false})
})

userRouter.get("/register", (req,res)=>{
    res.render("newUserForm.ejs", {user:true, pass:true})
})

userRouter.post("/register", (req, res)=>{
    const {userName, userPass, userRecovery, avatarId} = req.body
    archivoJson.save({userName,userPass, userRecovery ,avatarId})
    res.redirect("/")
})

userRouter.get("/recovery", (req, res)=>{
    const {userName, userPass}= req.body
    res.render("recovery.ejs", {userName:true, userRecovery:true, userPass:true})
})

userRouter.post("/recovery", (req,res)=>{
    const {userName, newUserPass, userRecovery}=req.body
    const result=archivoJson.validateRecovery(userName,newUserPass, userRecovery)
    if(reult.userName&&reult.userRecovery){
        return res.redirect("/")
    }
    res.render("recovery.ejs", {result} )
})

module.exports = userRouter