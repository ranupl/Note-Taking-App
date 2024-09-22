import axios from "axios";
import config from '../config';

export const updateNoteApi = async (_id, payload) => {
    try {
        
        const response = await axios.put(`${config.apiUrl}/api/v1/notes/editNote/${_id}`, payload);
        return response;

    } catch(error) {
        console.log(error);
    }
}