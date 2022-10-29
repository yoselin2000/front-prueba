import React, { useState, useRef } from "react";
import "./login.css";
import axios from "axios";
import swal from "sweetalert2";

const API = process.env.REACT_APP_API;

export function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  let [setUsers] = useState([]);

  const nameInput = useRef(null);
  //let History = useHistory();
  function validateForm() {
    return email.length > 0 && contrasena.length > 0;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios
        // .post(`${API}/Administrador-login`, { email, contrasena })
        .post(`http://34.125.147.49:80/Administrador-login`, { email, contrasena })
        .then((response) => {
          console.log(response);
          localStorage.setItem(
          //console.log(
            'login', JSON.stringify(response.data))
          window.location.href = "/About";
        })
        .catch(function (e) {
          
          console.log(e);
          swal.fire({
            title: "Credenciales incorrectas",
            text: "revisar datos ingresados",
            icon: "warning",
            button: "cerrar",
            // timer: "3000"
          })
           
        });
    } catch (error) {
      if (error.resonse.status === 500) {
        alert("contrasena invalida");
      }
    }

  };

  const getUsers = async () => {
    // const res = await fetch(`${API}/Administrador`);
    const res = await fetch(`http://34.125.147.49:80/Administrador`);
    const data = await res.json();
    setUsers(data);
  };


  return (
    <div>
    <div className="container-fluid text-center p-3 " >
      {/* <div style={containerStyle} ></div> */}
      <div className="body" ></div>
      <div className="grad" ></div>
      <div className="header">
        <a href="/">
          
        <div > 

          AGRECOL
          <span>Andes</span>
        </div>
        </a>
      </div>
      <center>
      <div className="col-md-8 ">
        <form onSubmit={handleSubmit} className="login" >
          <center>
            
            <h2 className="login-text">LOGIN</h2>
          </center>

          <br />
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              ref={nameInput}
              autoFocus
              placeholder="email@gmail.com"
            />
          </div>
          <br />

          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
              className="form-control"
              placeholder="Contraseña"
            />
          </div>

          <div className="d-grid gap col-6 mx-auto">
            <h1></h1>
            <h1></h1>
            <button
              className="btn btn-primary btn-block"
              block="true"
              size="lg"
              type="submit"
              disabled={!validateForm()}
              value="Login"
            >
              LOGIN
            </button>
          </div>
        </form>

      </div>

      </center>

{/* 
      <div className="body"></div>
      <div className="grad"></div>
      <div className="header">
        <a href="/">
          
        <div>
          AGRECOL
          <span>Andes</span>
        </div>
        </a>
      </div>
      <div className="col-md-8">
      <form  onSubmit={handleSubmit} className="login">
        <div className="form-group">
          <label for="exampleDropdownFormEmail2">Email address</label>

          <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Email"
              ref={nameInput}
              autoFocus
            />
        </div>
        <div className="form-group">
          <label for="exampleDropdownFormPassword2">Password</label>
 
          <input
              type="password"
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
              className="form-control"
              placeholder="Contraseña"
            />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="dropdownCheck2"/>
          <label className="form-check-label" for="dropdownCheck2">
            Remember me
          </label>
        </div>
  
        <div className="d-grid gap col-6 mx-auto">
            <h1></h1>
            <h1></h1>
            <button
              className="btn btn-primary btn-block"
              block="true"
              size="lg"
              type="submit"
              disabled={!validateForm()}
              value="Login"
            >
              LOGIN
            </button>
            </div>
      </form>
      </div> */}

      
    </div>
    </div>
  );
}
