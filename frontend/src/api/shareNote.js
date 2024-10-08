import axios from "axios";
import config from '../config';

export const shareNoteApi = async (_id, payload) => {
    try {
        
        const response = await axios.put(`${config.apiUrl}/shareNote/${_id}`, payload);
        return response;

    } catch(error) {
        console.log(error);
    }
}