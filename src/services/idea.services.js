import axios from "axios";

export const IdeaServices = async ()=>{

    const getAllIdeas = await axios.get(import.meta.env.VITE_REACT_APP_API_URL + `ideas`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        return err
    })
    return getAllIdeas
};

export const IdeasInnovaServices = async (estadoId) =>{

    const getInnovacionIdeas = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/innovacion`, {
        params: { estadoId }
    })
        .then((res) => {

            return res.data
        })
        .catch((err) => {
            console.log(err)
            return err
        })
    return getInnovacionIdeas
}

export const getIdeasById = async (idUsuario) => {
    const getInnovacionIdeas = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/usuarios/${idUsuario}`)
    .then((res)=>{
        return res.data
    })
    .catch((err)=>{
        console.log(err)
        return err
    })
    return getInnovacionIdeas
}

export const getUnitIdea = async (idIdea) => {
    try {
        const filterUnitIdea = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/${idIdea}`);
        return filterUnitIdea.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const getNextStages = async (ideaId) => {
    try{
       const nextStages = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/siguientesEstados/${ideaId}`); 
       return nextStages.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
export const postNewStage = async(updateStage) => {
    try{
        const newStage = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/estado`, updateStage); 
        return newStage.data;
     }
     catch (err) {
         console.log(err);
         throw err;
     }
}
export const getIdeaConfig = async () =>{
    try{
        const allIdeaConfig = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}focos/filtros`); 
        return allIdeaConfig.data;
     }
     catch (err) {
         console.log(err);
         throw err;
     }
}
export const putUpdateIdea = async (upDateIdea, ideaId)=>{
    try{
        const updateTheIdea = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/${ideaId}`, upDateIdea);
        return updateTheIdea.data;
    }
    catch (err){
        console.log(err);
        throw err;
    }
}
export const postIdeaFile = async (dataFile, idIdea) =>{
    try{
        const ideaFile = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/${idIdea}/file`, dataFile, {
            headers:{
                "Content-Type": "multipart/form-data",
            } 
        });
        return ideaFile.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export const postCreateIdea = async (newData)=>{
    try{
        const createIdea = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}ideas`, newData, {
            headers:{
                "Content-Type": "multipart/form-data",
                "Content-Type":"application/json"
            } 
        })
        return createIdea.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
export const putCreateComment = async (data, idIdea)=> {
    try{
        const resCreateComment = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/${idIdea}/comentarios`, data)
        return resCreateComment.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
/* pOSIBLEMENTE LO VOY A ELIMINAR */
export const deleteIdeaFile = async (idIdea, fileName) =>{
    try{
        const deleteFile = await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}ideas/${idIdea}/identificador/${fileName.identificado}/file/${fileName.file}`)
        return deleteFile.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
/* pOSIBLEMENTE LO VOY A ELIMINAR */
export const getLabels = async ()=>{
    try{
        const reslabels = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}etiquetas`)
        return reslabels.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}