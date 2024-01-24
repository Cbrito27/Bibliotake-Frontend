import "./NavBar.css";
import React, { useState } from "react";
import { useEffect } from "react";
import bibliotake from "../../assets/bibliotake.png";
import LoginForm from "../LoginForm/LoginForm";
import { dataDecrypt } from "../../util/encrypt";
import { getPhotoComment } from "../../services/users.services";
const NavBar = ({ onSearchChange }) => {
  const encryptedUserData = sessionStorage.getItem("user");
  const user = encryptedUserData ? dataDecrypt(encryptedUserData) : null;

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const handleIngresarClick = () => {
    setMostrarLogin(true);
  };
  const handleSearchChange = (event) => {
    const term = event.target.value;
    onSearchChange(term);
  };
  const handleCloseLogin = () => {
    setMostrarLogin(false);
  };

  const logOut = async () => {
    sessionStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
        try {
          const url = await getPhotoComment(user.id);
          setAvatarUrl(url);
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
    };

    fetchAvatar();
  }, [user]);

  return (
    <div className="navbar">
      <nav>
        <div className="imagen">
        <li>
          <img src={bibliotake} alt="jnsadkjadskjasd" />
          <input
              type="text"
              placeholder="Buscar"
              onChange={handleSearchChange}
            />
        </li>
        </div>
        <div className="searchBar">
          {user ? (
            <div className="Arriba">
               <p>{user.nombre}</p>
              {avatarUrl && <img className="avatar" src={avatarUrl} alt="Avatar" />}
             
              <button onClick={logOut}>Cerrar Sesión</button>
            </div>
          ) : (
            <button className="ingresar-btn" onClick={handleIngresarClick}>
              Ingresar
            </button>
          )}{" "}
          <div>{mostrarLogin && <LoginForm onClose={handleCloseLogin} />}</div>
        </div>
      </nav>
    </div>
  );
};

export { NavBar };
