
import React, { useState, useEffect, useRef } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const API = process.env.REACT_APP_API;

export const Localizacion = () => {

  const [nombre_planta, setNombre_planta] = useState('');
  const [imagen, setImagen] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');


  const [editing, setEditing] = useState(false)
  const [id, setId] = useState('');

  const nameInput = useRef(null);

  let [Localizacion, setLocalizacion] = useState([]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(API)
        if (!editing) {
          // const res = await fetch(`${API}/Localizacion`, {
            const res = await fetch(`http://34.125.147.49:80/Localizacion`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //'Accept': 'application/json'
            },
            body: JSON.stringify({
              nombre_planta,
              imagen,
              latitud,
              longitud
            }),
          });
          const data = await res.json();
          console.log(data)
          await getLocalizacion();
    
          setNombre_planta('');
          setImagen('');
          setLatitud('');
          setLongitud('');
      
    }else{
      // const res = await fetch(`${API}/Localizacion/${id}`, {
        const res = await fetch(`http://34.125.147.49:80/Localizacion/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_planta,
          imagen,
          latitud,
          longitud
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
  await getLocalizacion();

    setNombre_planta('');
    setImagen('');
    setLatitud('');
    setLongitud('');
  nameInput.current.focus();
};


  const getLocalizacion = async () => {
    // const res = await fetch(`${API}/Localizacion`);
    const res = await fetch(`http://34.125.147.49:80/Localizacion`);
    const data = await res.json();
    setLocalizacion(data);
  };

  const deleteLocalizacion = async (id) => {
    const PlantaResponse = window.confirm("¿Está seguro de que desea eliminarlo?");
    if (PlantaResponse) {
      // const res = await fetch(`${API}/Localizacion/${id}`, {
        const res = await fetch(`http://34.125.147.49:80/Localizacion/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getLocalizacion();
    }
  };

  const editLocalizacio = async (id) => {
    // const res = await fetch(`${API}/Localizacio/${id}`);
    const res = await fetch(`http://34.125.147.49:80/Localizacio/${id}`);
    const data = await res.json(); //lo convertimos en un json

    setEditing(true);
    setId(id)

    // Reset
    setNombre_planta(data.nombre_planta);
    setImagen(data.imagen);
    setLatitud(data.latitud);
    setLongitud(data.longitud);

    nameInput.current.focus();
  };

  useEffect(() => {
    getLocalizacion();
  }, []);

  return (
    <div className="row">
      <center> <h4>REGISTRO LOCALIZACION</h4></center>

      <div className="col-md-12">
        <form onSubmit={handleSubmit} className="card card-body">

          <div className="form-group">
            <input
              type="nombre_planta"
              onChange={(e) => setNombre_planta(e.target.value)}
              value={nombre_planta}
              className="form-control"
              placeholder="Nombre planta"
              ref={nameInput}
              autoFocus
            />
          </div>


          <div className="form-group">
            <input
              type="latitud"
              onChange={(e) => setLatitud(e.target.value)}
              value={latitud}
              className="form-control"
              placeholder="Latitud"
            />
          </div>

          <div className="form-group">
            <input
              type="longitud"
              onChange={(e) => setLongitud(e.target.value)}
              value={longitud}
              className="form-control"
              placeholder="Longitud"
            />
          </div>

          <div className="form-group" >
            <input
              type="text"
              name="imagen"
              accept=".JPG .MOV .jpg .png .jpeg"
              onChange={(e) => setImagen(e.target.value)}
              value={imagen}
              className="form-control"
              placeholder="Imagen"

            /> 

          </div>

          <button className="btn btn-primary btn-block">
            {editing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>

      
      <h1></h1>
          <h1></h1>
          <h1></h1>
          <center> <h4>LISTA DE LOCALIZACION</h4></center>
      <div className="col-md-2">
        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre planta</th>
              <th>Latitud</th>
              <th>Latitud</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            
            {Localizacion.map((Localizacio) => (
              <tr key={Localizacio._id}>
                <td>{Localizacio.nombre_planta}</td>
                <td>{Localizacio.latitud}</td>
                <td>{Localizacio.longitud}</td>
                <td>{Localizacio.imagen}</td>
                <td>
                  <button
                    className="btn btn-dark btn-sm btn-block"
                    onClick={(e) => editLocalizacio(Localizacio._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteLocalizacion(Localizacio._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

<Table className="table table-responsive table-striped">
      <Thead>
        <Tr>
          <Th>Nombre planta</Th>
          <Th>Latitud</Th>
          <Th>Latitud</Th>
          <Th>Imagen</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
      {Localizacion.map((Localizacio) => (
          <Tr key={Localizacio._id}>
          <Td>{Localizacio.nombre_planta}</Td>
          <Td>{Localizacio.latitud}</Td>
          <Td>{Localizacio.longitud}</Td>
          <Td>{Localizacio.imagen}</Td>
            <Td>
              <button
               className="btn btn-dark btn-sm btn-block"
               onClick={(e) => editLocalizacio(Localizacio._id)}
               >
                Editar
               </button>
               <button
                className="btn btn-danger btn-sm btn-block"
                onClick={(e) => deleteLocalizacion(Localizacio._id)}
                >
                Elimimar
                </button>
                </Td>
                </Tr>
        ))}
      </Tbody>
    </Table>
      </div>
    </div>
  );
};

