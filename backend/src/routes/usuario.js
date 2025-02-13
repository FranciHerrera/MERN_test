const { Router } = require("express");
const router = Router();

const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserByName,
} = require("../controller/usuario.controller");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).delete(deleteUser).put(updateUser);

router.route("/nombre/:nombre").get(getUserByName);

module.exports = router;
