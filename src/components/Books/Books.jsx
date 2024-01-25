import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css';
import { getBookImg } from '../../services/book.services';
import { getAllBook } from '../../services/book.services';
import { Link } from 'react-router-dom';
const Books = () => {
  const [libros, setLibros] = useState([]);
  const [librosImgUrls, setLibrosImgUrls] = useState([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const librosData = await getAllBook();
        setLibros(librosData);

        // Obtener las URLs de las imágenes de los libros
        const librosUrls = await Promise.all(librosData.map(async (libro) => {
          if (libro.foto !== "" && libro.foto !== undefined) {
            return await getBookImg(libro.foto);
          } else {
            return null;
          }
        }));

        setLibrosImgUrls(librosUrls);
      } catch (error) {
        console.error('Error al obtener la lista de libros', error);
      }
    };

    fetchLibros();
  }, []);

  console.log(libros);
console.log(librosImgUrls);
  return (
    <div className='BooksContent'>
      <h1>Listado de Libros</h1>
      <div className='LibrosContainer'>
        {libros.map((libro, index) => (
          <div key={index} className='LibroItem'>
                      
            {librosImgUrls[index] && (
              <img src={librosImgUrls[index]} alt={`Imagen de ${libro.titulo}`} />
            )}
             <h3>{libro.titulo}</h3>
            <p>{libro.sinopsis}</p> 
           <p>Cantida disponible: {libro.disponibles}</p>
           <Link to={`libro/${libro._id}`} key={index}>
            <button>Alquilar</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Books };