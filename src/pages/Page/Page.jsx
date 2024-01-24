import React, { useEffect, useState } from "react";
import "./Page.css";
import { getBookImg } from "../../services/book.services";
import { getAllBook } from "../../services/book.services";

const Page = ({ searchTerm }) => {
  const [libros, setLibros] = useState([]);
  const [librosImgUrls, setLibrosImgUrls] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const librosData = await getAllBook();

        const filteredLibros = librosData.filter((libro) =>
          libro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setLibros(filteredLibros);

        const librosUrls = await Promise.all(
          filteredLibros.map(async (libro) => {
            if (libro.foto !== "" && libro.foto !== undefined) {
              return await getBookImg(libro.foto);
            } else {
              return null;
            }
          })
        );

        setLibrosImgUrls(librosUrls);
      } catch (error) {
        console.error("Error al obtener la lista de libros", error);
      }
    };

    fetchLibros();
  }, [searchTerm]);
  return (
    <div className="PageContent">
      <h1>Listado de Libros</h1>
      <div className="LibrosContainer">
        {libros.map((libro, index) => (
          <div key={index} className="LibroItem">
            {librosImgUrls[index] && (
              <img
                src={librosImgUrls[index]}
                alt={`Imagen de ${libro.titulo}`}
              />
            )}
            <h3>{libro.titulo}</h3>
            <p>{libro.sinopsis}</p>
            <p>Cantida disponible: {libro.disponibles}</p>
            <button>Alquilar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Page };
