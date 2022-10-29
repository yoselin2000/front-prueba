import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/about.css";
import jsPDF from "jspdf";
import img from "../img/agrecol.png";


const API = process.env.REACT_APP_API;

export const PlantaSingle = () => {
  const [planta, setPlanta] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    getPlanta();
  }, []);

  const getPlanta = async () => {
    // const result = await axios.get(`${API}/Plantas_medicinale/` + path);
    const result = await axios.get(`http://34.125.147.49:80/Plantas_medicinale/` + path);
    setPlanta(result.data);
  };

  const geopocition = () => {
    localStorage.setItem('nombre_para_geopo', planta.nombre_planta);
    window.location.href = '/Geolocalizacion/';
  }


  const Generar_pdf = async () =>{
    var doc = new jsPDF("p", "mm", "a4");
    // var width = doc.internal.pageSize.getWidth();
    // var height = doc.internal.pageSize.getHeight();
    // doc.addImage(img, 'PNG', 0,0,width,height)
    var img1 = planta.imagen

    doc.addImage(img, 'PNG', 10,5,40,25)
    doc.setFont('Arial', 'bold', 10)
    doc.text(154, 22, "Fecha: 10-11-22")//fecha automatica
    doc.text(55, 42, "INFORMACION DE PLANTA MEDICINAL")

    // doc.cell(30,10,10,30,'title',30,0)

    doc.addImage(img1, 'jpg',70,50,70,70)
    doc.text(18, 135, "Nombre de la planta: " )
    doc.text(18, 145, "Nombre cientifico: " )
    doc.text(18, 155, "Propiedades:" )
    doc.text(18, 195, "Descripcion:" )
    doc.text(18, 235, "Conocimiento ancestral:" )
    // doc.text(18, 255, "Latitud:" )
    // doc.text(18, 265, "Longitud:" )

    doc.setFont('Helvertica', 'Normal')

    doc.text(80, 135, planta.nombre_planta)
    doc.text(80, 145, planta.nombre_cientifico)
    doc.text(80, 155, planta.propiedades, {align: 'justify',lineHeightFactor: 1, maxWidth:110})
    doc.text(80, 195, planta.descripcion, {align: 'justify',lineHeightFactor: 1,maxWidth:110})
    doc.text(80, 235, planta.conocimiento_ancestral, {align: 'justify',lineHeightFactor: 1,maxWidth:110} )
    // doc.text(80, 255, planta.latitud)
    // doc.text(80, 265, planta.longitud)

    // doc.addPage()

    doc.save('DocumentPlanta.pdf')
}


  return (
    <>
      <div>
        <center>
        <h1>{planta.nombre_planta}</h1>
        <br/>
        <img
          className="planta-img"
          // src={process.env.REACT_APP_API + "/file/" + planta.imagen}
          src={planta.imagen}
          // src={img2}
          alt="img"
        /></center>
        <br/>
      </div>
      <div className="container mt-4 mb-4">
        {/* <h2 className="planta-title">
          nombre de la planta: <span>{planta.nombre_planta}</span>
        </h2> */}
        <h2 className="planta-title">
          nombre cientifico: <span>{planta.nombre_cientifico}</span>
        </h2>
        <h2 className="planta-title">
          propiedades: <span>{planta.propiedades}</span>
        </h2>
        <h2 className="planta-title">
          descripcion: <span>{planta.descripcion}</span>
        </h2>
        <h2 className="planta-title">
          conocimiento ancestral: <span>{planta.conocimiento_ancestral}</span>
        </h2>
        {/* <h2 className="planta-title">
          latitud: <span>{planta.latitud}</span>
        </h2>
        <h2 className="planta-title">
          longitud: <span>{planta.longitud}</span>
        </h2> */}
      </div>
      
      <center>
      <Link to={"/About"}>
        <button className="btn btn-dark">ATRAS</button>
        <button className="btn btn-danger" onClick = {Generar_pdf}> descargar PDF</button>
      </Link>

      <Link onClick={geopocition}>
      <button className="btn btn-dark">CONOCER UBICACION</button>
      </Link>
      </center>

      {/* <Link to={"/Pdf"}>
      <button className="btn btn-info">GENERAR PDF</button>
      </Link> */}

      {/* <center>
      <button className="btn btn-danger" onClick = {Generar_pdf}> descargar PDF</button>
      </center> */}
    </>
  );
};
