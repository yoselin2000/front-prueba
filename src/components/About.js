import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/about.css";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API;

export const About = () => {
  const [plantas, setPlantas] = useState([]);
  const [busqueda, setBusqueda]= useState("");
 // const [plantas1, setPlantas1] = useState([]);

  useEffect(() => {
    getPlantas();
  }, []);

  const getPlantas = async () => {
    // const result = await axios.get(`${API}/Plantas_medicinales`);
    const result = await axios.get(`http://34.125.147.49:80/Plantas_medicinales`);
    setPlantas(result.data);
    
  };

  console.log(plantas)

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  
  const filtrar = (terminoBusqueda)=>{

    var resultadosBusqueda=plantas.filter((elemento)=>{
      if(elemento.nombre_planta.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.nombre_cientifico.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.conocimiento_ancestral.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    })
    setPlantas(resultadosBusqueda);
  }

  return (
    <div>


<form className="form-inline">
    <input className="form-control mr-sm-2" value={busqueda} placeholder = "SEARCH" onChange={handleChange}/>
    {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
</form>
<br/>

    <div className="grid-container">
      {plantas.map((planta, index) => (
        <div className="grid-card" key={index}>
          <img
            className="card-img"
            // src={API + '/file/' + planta.imagen}
            src={planta.imagen}
            //src = {img1}
            alt={planta.nombre_planta}
          />
          <div className="card-content">
            <h1 className="card-name">{planta.nombre_planta}</h1>
            <h3 className="card-name-scientific">{planta.nombre_cientifico}</h3>
            <h5 className="card-name-scien">{planta.conocimiento_ancestral}</h5>
            <h1></h1>
            <h1></h1>
            <h1></h1>
            <Link to={`/planta_medicinal/${planta._id}`}>
              <button className="card-button">CONOCER</button>
            </Link>
          </div>
        </div>

      ))}
    </div>

    </div>
  );
};


