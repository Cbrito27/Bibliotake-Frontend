import "./NavBar.css";
import React, { useState, useEffect } from "react";
import bibliotake from "../../assets/bibliotake.png";
import LoginForm from "../LoginForm/LoginForm";
import { dataDecrypt } from "../../util/encrypt";
import { getPhotoComment } from "../../services/users.services";
import { getAllBook } from "../../services/book.services";

const NavBar = () => {
  const encryptedUserData = sessionStorage.getItem("user");
  const user = encryptedUserData ? dataDecrypt(encryptedUserData) : null;

  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleIngresarClick = () => {
    setMostrarLogin(true);
  };

  const handleCloseLogin = () => {
    setMostrarLogin(false);
  };

  const logOut = async () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const searchBooks = async () => {
    try {
      const books = await getAllBook(); // Obtén la lista completa de libros (o realiza la solicitud necesaria)
      const filteredBooks = books.filter((book) =>
        book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredBooks);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user && user.id) {
        try {
          const url = await getPhotoComment(user.id);
          if (url) {
            setAvatarUrl(url);
          }
        } catch (error) {
          console.error("Error fetching avatar:", error);
        }
      }
    };
  
    fetchAvatar();
  }, [user && user.id]); // Only include user.id in the dependency array if user is truthy
  
  

  useEffect(() => {
    searchBooks();
  }, [searchTerm]);

  return (
    <div className="navbar">
      <nav>
        <div className="imagen">
          <li>
            <img src={bibliotake} alt="jnsadkjadskjasd" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          {searchTerm && (
            <div className="searchResults">
              {searchResults.map((book) => (
                <div key={book.id}>
                  <p>{book.titulo}</p>
                  <p>{book.genero}</p>
                </div>
              ))}
            </div>
          )}
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
          )}
          <div>{mostrarLogin && <LoginForm onClose={handleCloseLogin} />}</div>
        </div>
      </nav>
    </div>
  );
};

export { NavBar };
