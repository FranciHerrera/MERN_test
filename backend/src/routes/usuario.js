const { Router } = require("express")
const router = Router()

const {createUser, getUsers, getUser, deleteUser, updateUser} = require('../controller/usuario.controller')

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser)

module.exports = router;