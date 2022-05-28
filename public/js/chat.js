const socket=io()

const spanNotification=document.getElementById("notification")
const userList=document.getElementById("userList")
const inputMessage=document.getElementById("inputMessage")
const inputUserName=document.getElementById("userName")
const btnMessage=document.getElementById("btnMessage")
const chatContainer=document.getElementById("chatContiner")

btnMessage.addEventListener("click",()=>{
    const data = {
        userName:inputUserName.value,
        message:inputMessage.value
    }
    socket.emit("mensajeCliente", data)
})

socket.on("inicio", data=>{
    //console.log(data)    
})

socket.on("nuevoUsuario", data=>{
    spanNotification.innerHTML= `${data.userName} se unio al chat`
})

socket.on("users", data=>{
    localUser=data[data.length-1]
    userList.innerHTML=""
    data.map(user=>{
        userList.innerHTML+=`
            <li class="clearfix">
                <img src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" alt="avatar">
                <div class="about">
                    <div class="name">${user.userName}</div>
                    <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>
                </div>
            </li>
        `
    })
})

socket.on("mensajeServidor", ({userName, avatarId, message})=>{
    console.log(inputUserName.value===userName)
    chatContainer.innerHTML+=`
        <li class="clearfix">
            <div class="message-data text-right">
                <span class="message-data-time">10:10 AM, Today</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar${avatarId}.png" alt="avatar">
                <p>${userName}</p>
            </div>
            <div class="message other-message ${inputUserName.value==userName && "float-right"}">${message}</div>
        </li>
    `
})
