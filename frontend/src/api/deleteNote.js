import axios from "axios";
import config from '../config';

export const deleteNoteApi = async (_id) => {
 
    try {
        const response = await axios.delete(`${config.apiUrl}/api/v1/notes/removeNote/${_id}`);
        return response;

    } catch(error) {
        console.log(error);
    }
}