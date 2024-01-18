import React, { useState } from "react";
import { crearUsuario } from "../../services/users.services";

const RegisterForm = ({ onClose }) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [archivo, setarchivo] = useState(null);
  const [errorMensaje, setErrorMensaje] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!nombres || !apellidos || !correo || !contrasena) {
      setErrorMensaje("Por favor, complete todos los campos obligatorios.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("nombres", nombres);
      formData.append("apellidos", apellidos);
      formData.append("correo", correo);
      formData.append("contrasena", contrasena);
      formData.append("archivo", archivo);

      const response = await crearUsuario(formData);


      onClose();
    } catch (error) {
      if (error.response) {
        setErrorMensaje(error.response.data.mensaje);  estado
      } 
    }
  };

  const handlearchivoChange = (e) => {
    const file = e.target.files[0];
    setarchivo(file);
  };

  return (
    <div className="registerform">
      <h1>Registrarse</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="nombres">Nombres</label>
        <input
          type="text"
          name="nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />

        <label htmlFor="apellidos">Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <label htmlFor="archivo">Foto de perfil</label>
        <input
          type="file"
          name="archivo"
          accept="image/*"
          onChange={handlearchivoChange}
        />

        <button type="submit">Registrarse</button>
        {errorMensaje && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {errorMensaje}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
