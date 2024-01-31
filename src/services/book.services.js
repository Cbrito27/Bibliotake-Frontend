import axios from "axios";

export const getAllBook = async () => {
  try {
    const retos = await axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}libros`)
      .then((res) => res.data)
      .catch((res) => res.data);
    return retos;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getBookImg = async (bookName) => {
  try {
    return `${import.meta.env.VITE_REACT_APP_API_URL}libros/${bookName}/img`;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const rentBook = async (idLibro, usuario, fechaDevolucion) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}libro/${idLibro}/alquilar`,
      {
        usuario: usuario,
        fechaDevolucion: fechaDevolucion,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al alquilar el libro", error);
    throw error;
  }
};
export const getBookId = async (idBook) => {
  const getBooksId = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}libro/${idBook}`)
  .then((res)=>{
      return res.data
  })
  .catch((err)=>{
      console.log(err)
      return err
  })
  return getBooksId
}


