const socket=io()

const spanNotification=document.getElementById("notification")
const userList=document.getElementById("userList")

socket.on("inicio", data=>{
    console.log(data)
})

socket.on("nuevoUsuario", data=>{
    spanNotification.innerHTML= `${data} se unio al chat`
})

socket.on("users", data=>{
    userList.innerHTML=""
    data.map(user=>{
        userList.innerHTML+=`
            <li class="clearfix">
                <img src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" alt="avatar">
                <div class="about">
                    <div class="name">${user.name}</div>
                    <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>
                </div>
            </li>
        `
    })
})