const userCtrl = {}

const Usuario = require('../models/Usuarios')

userCtrl.LogIn = async (req, res) => {
    const { correo, contraseña } = req.body
    const log = (await Usuario.findOne({correo: correo, contraseña: contraseña}))
    console.log(log)
    if(log){
        res.json("Ha iniciado")
    }
    else{
        console.log("Algún dato es incorrecto o no existe")
    }
}

userCtrl.Datos = async (req, res) => {
    var datos = await Usuario.find();
    res.json(datos)
}

userCtrl.Register = async (req, res) => {
    const { usuario, correo, contraseña, ccontraseña } = req.body
    console.log(req.body)
    /*if(contraseña != ccontraseña){
        errors.push({text: "Contraseñas no son iguales"})
    }
    if(contraseña.length < 4){
        errors.push({text: "La contraseña debe de ser por lo menos 4 caracteres"})
    }
    if(errors.length > 0){
        res.render('/signup', {
            errors,
            usuario,
            correo,
            contraseña,
            ccontraseña
        })
    }else{
        const email = await Usuario.findOne({correo: correo})
        if(email){
            req.flash("error_msg", "El correo ya está registrado")
            res.redirect('/login')
        }else{
            const Newuser = new Usuario({ usuario, correo, contraseña })
            await Newuser.save()
            req.flash("success_msg", "Se ha registrado")
            req.redirect("/login")
        }
    }*/

}

userCtrl.LogOut = (req, res) => {
    req.logout()
    req.flash("success_msg", "Haz cerrado sesión")
    res.redirect("/login")
}

userCtrl.Profile = async (req,res) => {
    console.log(req.params.id)
    const user = await Usuario.findById(req.params.id)
    .then(user => {
        if(user){
            res.json(user)
        }
        res.json({"error":"No se encontró"})
    })
    .catch(err => {
        res.json({"error":"No jala está cochinada"})
    })
}

module.exports = userCtrl