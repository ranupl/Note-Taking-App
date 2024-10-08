import axios from "axios";
import config from '../config';

export const getNoteByIdApi = async (_id) => {
  
    try {
      
        const response = await axios.get(`${config.apiUrl}/getNote/${_id}`);
        return response.data;

    } catch(error) {
        console.log(error);
    }
}