import React, { useState, useEffect, useRef } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const API = process.env.REACT_APP_API;

export const Users = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [editing, setEditing] = useState(false);//para poder cambiar el estado de falso a verdadero
  const [id, setId] = useState("");
  const nameInput = useRef(null);


  let [Administrador, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      // const res = await fetch(`${API}/Administrador`, {
        const res = await fetch(`http://34.125.147.49:80/Administrador`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          contrasena
        }),
      });
      const data = await res.json();
      console.log(data)
      await getUsers();

      setNombre('');
      setEmail('');
      setContrasena('');

    } else {
      // const res = await fetch(`${API}/Administrador/${id}`, {
        const res = await fetch(`http://34.125.147.49:80/Administrador/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          contrasena
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setNombre("");
    setEmail("");
    setContrasena("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    // const res = await fetch(`${API}/Administrador`);
    const res = await fetch(`http://34.125.147.49:80/Administrador`);
    const data = await res.json();
    setUsers(data);
  };

  const deleteUsers = async (id) => {
    const userResponse = window.confirm("¿Está seguro de que desea eliminarlo?");

    if (userResponse) {
      // const res = await fetch(`${API}/Administrador/${id}`, {
        const res = await fetch(`http://34.125.147.49:80/Administrador/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    // const res = await fetch(`${API}/Administrado/${id}`);
    const res = await fetch(`http://34.125.147.49:80/Administrado/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setNombre(data.nombre);
    setEmail(data.email);
    setContrasena(data.contrasena);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    
    <div className="row">
      <center> <h4>REGISTRO DE USUARIOS</h4></center>
      <div className="col-md-12">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              className="form-control"
              placeholder="Usuario"
              ref={nameInput}
              autoFocus
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Email"
              ref={nameInput}
              autoFocus
            />
            <div class="input-group-append">
            {/* <span class="input-group-text" id="basic-addon2">@gmail.com</span> */}
            </div>
          </div>


          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
              className="form-control"
              placeholder="Contraseña"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>

<br></br>
<h1></h1>
<h1></h1>
<h1></h1>

<center> <h4>LISTA DE USUARIOS</h4></center>
<br></br>
     
      {/* <div className="col-md-6"> */}
        {/* <table className="table table-responsive table-striped">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Email</th>             
              <th scope="col">Contraseña</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Administrador.map((user) => (
              <tr key={user._id}>
                <td scope="row">{user.nombre}</td>
                <td scope="row">{user.email}</td>
                <td scope="row">{user.contrasena}</td>

                <td>
                  <button
                    className="btn btn-dark btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUsers(user._id)}
                  >
                    Elimimar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* </div>  */}
        <Table className="table table-responsive table-striped">
      <Thead>
        <Tr>
          <Th>Usuario</Th>
          <Th>Email</Th>
          <Th>Contraseña</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
      {Administrador.map((user) => (
        <Tr key={user._id}>
          <Td>{user.nombre}</Td>
          <Td>{user.email}</Td>
          <Td>{user.contrasena}</Td>
            <Td>
              <button
               className="btn btn-dark btn-sm btn-block"
               onClick={(e) => editUser(user._id)}
               >
                Editar
               </button>
               <button
                className="btn btn-danger btn-sm btn-block"
                onClick={(e) => deleteUsers(user._id)}
                >
                Elimimar
                </button>
                </Td>
                </Tr>
        ))}
      </Tbody>
    </Table>
        

{/* 
<ResponsiveGridLayout
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
      >
        <GridItemWrapper key="blue-eyes-dragon">
          <GridItemContent>Blue Eyes Dragon</GridItemContent>
        </GridItemWrapper>
</ResponsiveGridLayout> */}

      {/* <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>             
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Administrador.map((user) => (
              <tr key={user._id}>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.contrasena}</td>
                <td>
                  <button
                    className="btn btn-dark btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUsers(user._id)}
                  >
                    Elimimar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div> */}
    </div>
  );
};

