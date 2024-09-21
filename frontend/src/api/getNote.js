import axios from "axios";

export const getNoteByIdApi = async (_id) => {
  
    try {
        const response = await axios.get(`http://localhost:5005/api/v1/notes/getNote/${_id}`);
        return response.data;

    } catch(error) {
        console.log(error);
    }
}