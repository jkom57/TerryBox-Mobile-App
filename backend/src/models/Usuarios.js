const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    _id: Object,
    usuario: {type: String, required: true, trim: true},
    correo: {type: String, required: true, trim: true},
    contraseña: {type: String, required: true, trim: true},
}, {
    collection: 'usuario'
})

module.exports = model("usuarios", UserSchema)