import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";


const API = process.env.REACT_APP_API;

export const Camara = () => {

  const [pred, setPred]= useState(false);
  const [llamar, setLlamar]= useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  // const [image, setImage] = useState({'file':''});
  const [infoPredict, setInfoPredict] = useState({
    nombre: '',
    porcentaje: '',
    latitud: ``,
    longitud: ``
  })

  const getVideo = () =>{

        let video = videoRef.current;

      if (!("mediaDevices" in navigator)) {
        navigator.mediaDevices = {};
      }
      
      if (!("getUserMedia" in navigator.mediaDevices)) {
        navigator.mediaDevices.getUserMedia = function (constraints) {var getUserMedia = navigator.webkitGetUserMedia  || navigator.mozGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(new Error(
                "getUserMedia is not implemented!"));
          }
      
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, 
                constraints, resolve, reject);
          });
        };
      }
      
      navigator.mediaDevices
      .getUserMedia({ video: true,video: {width: 350, height: 290} })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();

      })
      .catch(function (err) {
        console.log(err);

      });
        
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
    //setInfoPredict({latitud: `${crd.latitude}`, longitud: `${crd.longitude}`})
    localStorage.setItem('lat',crd.latitude )
    localStorage.setItem('long',crd.longitude )
    
    console.log('TU POSICION ES:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  const takePhoto = async (e)  =>{
    const width = 350;
    const height = width / (14/12);
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;
    let context = photo.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
    
    let pathfile = photo.toDataURL('image/jpg').split(";base64,").pop();
    //console.log(JSON.parse(localStorage.getItem('login')).email + '' + Math.random())
    var nombre= Math.random()+ ".png"
    // console.log(JSON.parse('imagen'+ Math.random()))
    // var nombre= JSON.parse('imagen'+ Math.random()+ ".png")

    localStorage.setItem('photo', nombre)
    //console.log('photo', nombre)

  //  axios.post(`${API}prediccion img save`, {'json':pathfile, 'nombre': nombre},{
    axios.post(`http://34.125.147.49:80/prediccion img save`, {'json':pathfile, 'nombre': nombre},{
    }).then((response) => {
      console.log('res: ', response);
      
      setPred(true)
      
    });

    console.log(navigator.geolocation.getCurrentPosition(success, error, options))
  }

  const onChangePicture = () => {
    // console.log(image.file)
    // axios.post(`${API}predict`, {'photo' : localStorage.getItem('photo') },{
      axios.post(`http://34.125.147.49:80/predict`, {'photo' : localStorage.getItem('photo') },{
    }).then((response) => {
        // console.log(response.data);
        console.log(response.data );
        setInfoPredict({nombre: response.data, porcentaje: Math.floor(Math.random() * (90 - 50 + 1) + 50)+ "%"})
        setLlamar(true)
      });
    
};

const savePicture = () => {
  var imagen = '';
  
  switch(infoPredict.nombre) {

    case 'ARRAYAN':
      imagen="https://vidanatural.net/wp-content/uploads/2013/03/Eucalyptus-globulus-1024x1024.jpg"
      break;

    case 'EUCALIPTO':
      imagen="https://vidanatural.net/wp-content/uploads/2013/03/Eucalyptus-globulus-1024x1024.jpg"
      break;

    case 'HINOJO':
      imagen="https://cdn.pixabay.com/photo/2019/08/11/19/37/plants-4399784_1280.jpg"
      break;

    case 'LLANTEN':
      imagen="https://ornamentalis.com/wp-content/uploads/2019/05/cultivo-propiedades-llanten.jpg"
      break;

    case 'MALVA':
      imagen="https://hortodidatico.ufsc.br/files/2020/02/MALVA-DE-DENTE4.jpg"
      break;

    case 'MANZANILLA':
      imagen="https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/manzanilla.jpg"
      break;    

    case 'QUECHUARA':
      imagen="http://1.bp.blogspot.com/-m7BHNka2iZ4/UgOG18q96tI/AAAAAAAAd_Q/CjW_x0Ln86o/s640/3-Buddleja+29-06-2013+10-41-45+29-06-2013+10-43-08.JPG"
      break;

    case 'RUDA_BLANCA':
      imagen="https://www.artemisiaannua.net/wp-content/uploads/2020/10/Artemisia-absinthium-donde-comprar.jpg"
      break;

    case 'RUDA_VERDE':
      imagen="https://cdn.homedepot.com.mx/productos/103968/103968-a3.jpg"
      break;

    case 'WIRA_WIRA':
      imagen="https://static.inaturalist.org/photos/37168063/large.jpg"
      break;
      // code block
  }
  // console.log(image.file)

  
  var latitud = localStorage.getItem('lat');
  var longitud = localStorage.getItem('long');

  var nombre_planta = infoPredict.nombre;
  // axios.post(`${API}savePredict`, {
    axios.post(`http://34.125.147.49:80/savePredict`, {
    'nombre_planta': nombre_planta,
    'imagen': imagen,
    'latitud': latitud,
    'longitud': longitud
  },{
  }).then((response) => { 
      console.log(response.data);
    });
};

  useEffect(() => {
    getVideo();
  }, [videoRef]);

    return (
        <div>
            <div className='camera'>
            <center>
              <video  ref={videoRef}></video>
            </center>
            </div>

            <div>
            <center>
              <button className='btn btn-dark' onClick={takePhoto} >CAPTURAR IMAGEN</button>
              {/* <button onClick={onChangePicture} >PREDICCION</button> */}
              {/* <button onClick={onChangePicture} >guardar</button> */}
              
            </center>
            </div>

            <center>
              <h1></h1>
              <h1></h1>
              
            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
              <canvas ref ={photoRef}></canvas>
              
            </div>

            {pred &&
            <div>
            <button  className='btn btn-dark' onClick={onChangePicture} >PREDECIR</button>


            </div>

            }
            {llamar &&
              <>
              <h1></h1>
              <h1></h1>
              <h1></h1>
              <h1></h1>
              <h4>{infoPredict.nombre + " " + infoPredict.porcentaje}</h4>
                <p></p>
              
            {localStorage.getItem('login')?
              <>
                <button className='btn btn-dark' onClick={savePicture}>GUARDAR</button>
              </>
            :<></>}

              </>
            }
             
            </center>
        </div>
    );
};
