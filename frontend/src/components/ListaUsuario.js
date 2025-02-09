import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListaUsuario = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/usuarios");
        setLista(res.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    getUsuarios();
  }, []); // Solo se ejecuta una vez al montar el componente

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      setLista(lista.filter((usuario) => usuario._id !== id)); // Actualiza la lista en el estado
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="row">
      {lista.map((List) => (
        <div className="col-md-4 p-2" key={List.id}>
          <div className="card">
            <div className="card-header">
              <h5>Nombre: {List.nombre}</h5>
            </div>
            <div className="card-body">
              <p>Apellido: {List.apellido}</p>
              <p>Edad: {List.edad}</p>
              <p>Telefono: {List.telefono}</p>
              <p>Correo: {List.correo}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => eliminarUsuario(List._id)}
              >
                Eliminar
              </button>
              <Link className="btn btn-primary m-1" to={"/edit/" + List._id}>
                Editar
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuario;
