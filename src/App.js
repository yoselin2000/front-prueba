import React from "react";
import { BrowserRouter as Router, Switch, Route, BrowserRouter} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import { Plantas_medicinales } from "./components/Plantas_medicinales";
import { Geolocalizacion } from "./components/Geolocalizacion/Geolocalizacion";
import { Login } from "./components/Login";
import { PlantaSingle } from "./components/information/PlantaSingle";
import { Camara } from "./components/Camara/Camara";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Principal} from "./components/Principal";
import { Footer } from "./components/Footer";
import { Localizacion} from "./components/Localizacion"
function App() {
  

  return (
    <div>
    <BrowserRouter>
      <Router>
        <Navbar />
        <Switch>
          <div className="container p-4">
            <Route path="/Users" component={Users} />
            <Route path="/About" component={About} />
            <Route path="/planta_medicinal/:plantaId" component={PlantaSingle} />
            <Route path="/Plantas_medicinales" component={Plantas_medicinales} />
            <Route path="/Localizacion" component={Localizacion} />
            <Route path="/Geolocalizacion" component={Geolocalizacion} />
            <Route path="/Camara" component={Camara} />
            <Route path="/Login" component={Login} />
            <Route path="/Principal" component={Principal} />
          </div>
        </Switch>
      </Router>
    </BrowserRouter>
  
      {/* <Principal/> */}


          <br/>
          <br/>
            {/* <div className="container-fluid bg-black text-center p-3">
            <a href='/login' className="text-white">&copy; Administrador</a>
            </div> */}
      <Footer/>
      </div>
  );
}

export default App;





// import React, { useState } from 'react';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import { IconButton } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100%",
//     textAlign: 'center',
//   },
//   imgBox: {
//     maxWidth: "80%",
//     maxHeight: "80%",
//     margin: "10px"
//   },
//   img: {
//     height: "inherit",
//     maxWidth: "inherit",
//   },
//   input: {
//     display: "none"
//   }
// }));function App() {
//   const classes = useStyles();const [source, setSource] = useState("");const handleCapture = (target) => {
//     if (target.files) {
//       if (target.files.length !== 0) {
//         const file = target.files[0];
//         const newUrl = URL.createObjectURL(file);
//         setSource(newUrl);
//       }
//     }
//   };return (
//     <div className={classes.root}>
//       <Grid container>
//         <Grid item xs={12}>
//           <h5>Capture your image</h5>
//           {source &&
//             <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
//               <img src={source} alt={"snap"} className={classes.img}></img>
//             </Box>}
//           <input
//             accept="image/*"
//             className={classes.input}
//             id="icon-button-file"
//             type="file"
//             capture="environment"
//             onChange={(e) => handleCapture(e.target)}
//           />
//           <label htmlFor="icon-button-file">
//             <IconButton
//               color="primary"
//               aria-label="upload picture"
//               component="span"
//             >
//               <PhotoCameraRoundedIcon fontSize="large" color="primary" />
//             </IconButton>
//           </label>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
// export default App;