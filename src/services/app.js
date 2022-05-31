const res = require("express/lib/response")
const fs = require("fs")

class Contenedor {
    constructor(nombreDelArchivo) {
        this.nombreDelArchivo = nombreDelArchivo
    }

    async save(objeto) {
        let objetos = await this.getAll()
        const objetoNuevo = { ...objeto, id: objetos.length > 0 ? objetos[objetos.length - 1].id + 1 : 1 }
        objetos.push(objetoNuevo)
        try {
            await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(objetos))
            console.log("Saved!!")
        } catch (err) {
            console.error(err)
        }
        return objetoNuevo.id
    }
    async update(arrayObjetos){
        try{
            await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(arrayObjetos))
            console.log("Updated!!")
        }
        catch(err){
            console.error(err)
        }
    }
    async getById(id) {
        let objetos = await this.getAll()
        return Promise.resolve(objetos.find(e => e.id === id))
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreDelArchivo, "utf-8")
            const objetos = data ? Promise.resolve(JSON.parse(data)) : []
            return objetos
        } catch (err) {
            console.log(err)
        }
    }
    async deleteById(id) {
        let objetos = await this.getAll()
        let result = objetos.filter(e => e.id !== id)
        await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(result))
    }
    async deleteAll() {
        await fs.promises.writeFile(this.nombreDelArchivo, "")
    }
    async validateUser(name) {
        let objetos= await this.getAll()
        console.log(objetos)
        return await objetos.find(e=>e.userName===name)
    }
    async validateRecovery(name, pass, recovery){
        let objetos= await this.getAll()
        let indice= objetos.findIndex(e=>e.userName===name)
        if(indice!==1){
            if(objetos[indice].userRecovery===recovery){
                objetos[indice].userPass=pass
                await this.update(objetos)
                return res.redirect("/user/login")
            }
            return {userName:true, userRecovery:false}
        }
        return {userName:false, userRecovery:true}
    }
}
const archivoJson = new Contenedor("entrega-6.json")
const archivoChat = new Contenedor("archivoChat.json")
module.exports = { archivoJson, archivoChat }

