import axios from "axios";
export const getActivities = async () => {
    try {
      const resActivities= await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}actividades`)
      return resActivities.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  export const postActivities = async (data) => {
    try {
      const resActivities= await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}actividades`, data,)
      return resActivities.status;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  export const putActivities = async (dataId, data) => {
    try {
      const resActivities= await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}actividades/${dataId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return resActivities.status;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  export const postFile = async (dataFile) => {
    try {
      const retoFile = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}actividades/archivo`,
        dataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return retoFile.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }