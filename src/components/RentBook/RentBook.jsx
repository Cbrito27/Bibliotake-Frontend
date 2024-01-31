// RentBook.js

import React, { useState, useEffect } from "react";
import { getBookId, rentBook, getBookImg } from "../../services/book.services";
import { useParams } from "react-router-dom";
import { dataDecrypt } from "../../util/encrypt";
import "./RentBook.css"; // Importa el archivo de estilos

const RentBook = () => {
  
  const { idLibro } = useParams();
  const [book, setBook] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const user = dataDecrypt(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await getBookId(idLibro);
        setBook(bookData);
        if (bookData.foto) {
          const avatarUrl = await getBookImg(bookData.foto);
          if (avatarUrl) {
            setAvatarUrl(avatarUrl);
          }
        }
      } catch (error) {
        console.error("Error al obtener la información del libro", error);
      }
    };

    fetchData();
  }, [idLibro, book.foto]);

  const handleAlquilar = async (e) => {
    e.prevenDefault;
    try {
      const response = await rentBook(idLibro, user.id, fechaDevolucion);
      console.log(response);
    } catch (error) {
      console.error("Error al alquilar el libro", error);
    }
  };

  return (
    <div className="RentBook">
      <div className="book-info">
        <h1>{book.titulo}</h1>
        <p className="author">Autor: {book.autor}</p> 
        <p className="synopsis">{book.sinopsis}</p>
        <p className="genre">Género: {book.genero}</p>
      </div>
      <form onSubmit={handleAlquilar} action="">
        <div className="rental-section">
          <img src={avatarUrl} alt="" />
          <p>Quedan: {book.disponibles}</p>
          <p>Hasta que dia quieres alquilarlo</p>
          <input
            type="date"
            placeholder="Fecha de devolución"
            value={fechaDevolucion}
            required
            onChange={(e) => setFechaDevolucion(e.target.value)}
          />
          <button>Alquilar Libro</button>
        </div>
      </form>
    </div>
  );
};

export default RentBook;
