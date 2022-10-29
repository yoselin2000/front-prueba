import React, { useEffect, useState, useRef} from "react";

import { Map, TileLayer, Marker, Popup, LayersControl, Polyline} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { IconLocation, IconLocation1 } from "./IconLocation";
import axios from "axios";
import '../../styles/geolocalizacion.css'
import useGeoLocation from "./useGeolocation";
// import Routing from './Routing';

const API = process.env.REACT_APP_API;

export const Geolocalizacion = () => {
  const redOptions = { color: 'red' }
  const fillBlueOptions = { fillColor: 'blue' }
  const limeOptions = { color: 'lime' }
  const polyline = [
    [-17.875523590353023, -65.0727214609577],
    [-17.919094245089283, -65.21760078943987],
    // [51.51, -0.12],
  ]


  const [Loc, setLoc] = useState([]);
  const position = [-17.8965, -65.04534];
  const mapRef = useRef();

  const location = useGeoLocation();
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const [busqueda, setBusqueda]= useState("");
  const [locateme, setLocateme]= useState({lat: 0, lon: 0, show: false});

  // From={[,]} To={[, ] }

  // const [start, setStart] = useState([-17.919094245089283, -65.21760078943987])
  // const [end, setEnd] = useState([-17.928995327173805, -64.99313947400455])

  // if(localStorage.getItem('nombre_para_geopo')){
  //   console.log(localStorage.getItem('nombre_para_geopo'))
  //   setBusqueda(localStorage.getItem('nombre_para_geopo'))
  // }
  

  useEffect(() => {
    getLoc();
  }, []);
  
  const getLoc = async () => {
    // const result = await axios.get(`${API}/Localizacion`);
    const result = await axios.get(`http://34.125.147.49:80/Localizacion`);
    console.log(result.data);
    setLoc(result.data);
  };

      const showMyLocation = () => {
        console.log(navigator.geolocation.getCurrentPosition(success, error, options))
        //leafletElement.getPlan()
      };


      const handleChange = (e) => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }
      
      const filtrar = (terminoBusqueda)=>{
    
        var resultadosBusqueda=Loc.filter((elemento)=>{
          if(elemento.nombre_planta.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
        })
        setLoc(resultadosBusqueda);
      }
    
     const mapas = [
      {
        name: "leaflet",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        checked: true
      },
      {
        name: "satelite",
        url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        checked: false
      }
     ] 


     const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    function success(pos) {
      const crd = pos.coords;
    
      console.log('TU POSICION ES:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      
      setLocateme({lat: crd.latitude, lon: crd.longitude, show: true});
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    const clickInfo= async e => {
      // const r = await axios.post(`${API}/getinfoplant`, {nombre: e.target.id});
      const r = await axios.post(`http://34.125.147.49:80//getinfoplant`, {nombre: e.target.id});
      console.log(r.data.result)
      window.location.href = '/planta_medicinal/' + r.data.result;
    }

   

  return (
    <div>
      <form className="form-inline" >
        <input className="form-control mr-sm-2" value={busqueda} placeholder = "SEARCH" onChange={handleChange}/>
      </form>
      <br/>
     
    <Map
      className="map"
      center={position}
      zoom={10}
      style={{ height: 550, width: "100%" }}>

      <LayersControl position="topright"> 
        {mapas.map(({name, url, checked})=> {
          return(
            <LayersControl.BaseLayer checked={checked} name={name} key={name}>
              <TileLayer url={url}/>
            </LayersControl.BaseLayer>
          )
        })}
      </LayersControl>

      {Loc.map((Lo, index, planta) => (
        <Marker
          position={[Lo.latitud, Lo.longitud]}
          icon={IconLocation}
          title={Lo.nombre_planta}
          key={index}
        >
          <Popup >
 
            <img
              className="popup-img"
              // src={API + "/file/" + planta.imagen}
              src={Lo.imagen}
              alt={Lo.nombre_planta}
            />
            <h4></h4>
            {Lo.nombre_planta} <br /> {"Latitud: " + Lo.latitud} <br />{"Longitud: " + Lo.longitud}{" "} 
          <h1></h1>
          <center>
          <a >
              <button id = {Lo.nombre_planta}  className="btn btn-dark btn-sm " onClick={clickInfo}>MAS INFORMACION</button>
              </a>
              </center>
          </Popup>
        
        </Marker>
      ))}

      {locateme.show &&
        <Marker
          position={[locateme.lat, locateme.lon]}
          icon={IconLocation1}
          title='ME'>
        </Marker>
      }

{/* <Marker icon={IconLocation1}  position={[-17.39347, -66.16107]} pathOptions={fillBlueOptions} radius={200} />
    <Marker icon={IconLocation1} position={[-17.3854, -67.2176]} pathOptions={redOptions} radius={20}/> */}
   
    {/* <Polyline pathOptions={limeOptions} positions={polyline} /> */}

    </Map>


          <div className="row my-4">
          <div className="col d-flex justify-content-center">
            <button className="btn btn-primary" onClick={showMyLocation}>
              Locate Me
            </button>
          </div>
        </div>
        </div>
  );
};

export default Geolocalizacion;
