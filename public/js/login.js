const socket = io()

const formLogin = document.getElementById("formLogin")

formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    const userName = document.getElementById("userName").value
    console.log(userName)
    socket.emit("usuario", { userName })
    e.target.submit()
})


socket.on("inicio", data => {
    console.log(data)
})