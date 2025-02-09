import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CrearUsuarios = () => {
  const valorInicial = {
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    correo: "",
  };

  let { id } = useParams();
  const [usuario, setUsuario] = useState(valorInicial);
  const [subId, setSubId] = useState(id || ""); // Evitar undefined

  // Capturar datos del formulario
  const caputrarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Guardar un nuevo usuario
  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/usuarios", usuario);
      setUsuario(valorInicial);
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  // Actualizar usuario
  const actualizarUsuario = async (e) => {
    e.preventDefault();
    if (!subId) {
      console.error("ID inválido para actualizar");
      return;
    }
    try {
      await axios.put(`http://localhost:4000/api/usuarios/${subId}`, usuario);
      setUsuario(valorInicial);
      setSubId("");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  // Obtener un usuario por ID
  const obtUno = async (id) => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/usuarios/${id}`);
      setUsuario(res.data);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  // Cargar usuario si hay un ID en la URL
  useEffect(() => {
    if (subId) {
      obtUno(subId);
    }
  }, [subId]);

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
          <h2 className="text-center mb-3">Crear usuario</h2>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre del usuario"
              required
              name="nombre"
              value={usuario.nombre}
              onChange={caputrarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Apellido</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el apellido del usuario"
              required
              name="apellido"
              value={usuario.apellido}
              onChange={caputrarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Edad</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa la edad del usuario"
              required
              name="edad"
              value={usuario.edad}
              onChange={caputrarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono</label>
            <input
              type="number"
              className="form-control"
              placeholder="Ingresa el número de teléfono del usuario"
              required
              name="telefono"
              value={usuario.telefono}
              onChange={caputrarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa el correo del usuario"
              required
              name="correo"
              value={usuario.correo}
              onChange={caputrarDatos}
            />
          </div>
          <button className="btn btn-primary form-control">
            Guardar usuario
          </button>
        </form>
        <button
          className="btn btn-success form-control mt-2"
          onClick={actualizarUsuario}
          disabled={!subId} // Deshabilitar si no hay un ID
        >
          Actualizar usuario
        </button>
      </div>
    </div>
  );
};

export default CrearUsuarios;
