import React, { useState } from "react";
//import Form from "react-bootstrap/Form";
import { Form } from "react-bootstrap";
//import Button from "react-bootstrap/Button";
//import "./Login.css";


export function LoginPrueba() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");

  function validateForm() {
    return nombre.length > 0 && contrasena.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  

  return (

    <div className="row">
        <div className="col-md-8" >
            <form onSubmit={handleSubmit} className="card card-body">
                <div className="Login">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="nombre">
                        <center><h2>LOGIN</h2></center>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            autoFocus
                            type="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        </Form.Group>


                        <Form.Group size="lg" controlId="contrasena">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="contrasena"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                        </Form.Group>
                        
                        <div className="d-grid gap col-6 mx-auto">
                          <h1></h1>
                          <h1></h1>
                          <button className="btn btn-primary btn-block" block="true" size="lg" type="submit" disabled={!validateForm()}>
                          Login
                          </button>
                        </div>

                    </Form>
                </div>
            </form>
        </div>
    </div>
  );
}





