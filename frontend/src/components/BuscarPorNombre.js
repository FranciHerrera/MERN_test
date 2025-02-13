import axios from "axios";
import React, { useState } from "react";

const BuscarUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");

  const capturarDatos = (e) => {
    setNombre(e.target.value);
  };

  const buscarUsuario = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/usuarios/nombre/${nombre}`
      );
      setUsuario(res.data);
      setError("");
    } catch (err) {
      setUsuario(null);
      setError("Usuario no encontrado");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h2 className="text-center mb-3">Buscar Usuario</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa el nombre del usuario"
            value={nombre}
            onChange={capturarDatos}
          />
        </div>
        <button
          className="btn btn-primary form-control"
          onClick={buscarUsuario}
        >
          Buscar
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
        {usuario && (
          <div className="mt-3">
            <h4>Nombre: {usuario.nombre}</h4>
            <p>Apellido: {usuario.apellido}</p>
            <p>Edad: {usuario.edad}</p>
            <p>Teléfono: {usuario.telefono}</p>
            <p>Correo: {usuario.correo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarUsuario;
