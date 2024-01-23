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
