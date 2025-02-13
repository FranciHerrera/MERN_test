const usuarioCtrl = {};

const Usuario = require("../models/Usuario");

usuarioCtrl.getUsers = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

usuarioCtrl.createUser = async (req, res) => {
  const { nombre, apellido, correo, telefono, edad } = req.body;
  const newUser = new Usuario({
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono,
    edad: edad,
  });
  await newUser.save();
  res.json({ message: "el usuario ha sido creado" });
};

usuarioCtrl.getUser = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  res.json(usuario);
};

usuarioCtrl.getUserByName = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ nombre: req.params.nombre }); // Busca por nombre
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error en la búsqueda", error });
  }
};

usuarioCtrl.deleteUser = async (req, res) => {
  const usuario = await Usuario.findByIdAndDelete(req.params.id);
  res.json({ message: "el usuario ha sido eliminado" });
};

usuarioCtrl.updateUser = async (req, res) => {
  const { nombre, apellido, correo, telefono, edad } = req.body;
  await Usuario.findByIdAndUpdate(req.params.id, {
    nombre,
    apellido,
    edad,
    correo,
    telefono,
  });
  res.json({ message: "el usuario ha sido actualizado" });
};

module.exports = usuarioCtrl;
