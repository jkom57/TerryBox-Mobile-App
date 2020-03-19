const { Router } = require('express')
const router = Router()

const { LogIn, Profile, Datos, Register, LogOut } = require('../controllers/usuarios.controller')

router.route('/login')
    .post(LogIn)

router.route('/perfil/:id')
    .get(Profile)

router.route('/users')
    .get(Datos)

router.route('/signup')
    .post(Register)

router.route('/logout')
    .get(LogOut)

module.exports = router