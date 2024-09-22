import axios from "axios";
import config from '../config';

export const deleteNoteApi = async (_id) => {
 
    try {
        const response = await axios.delete(`${config.apiUrl}/removeNote/${_id}`);
        return response;

    } catch(error) {
        console.log(error);
    }
}