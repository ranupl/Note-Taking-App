import axios from "axios";

export const updateNoteApi = async (_id, payload) => {
    try {
        const response = await axios.put(`http://localhost:5005/api/v1/notes/editNote/${_id}`, payload);
        return response;

    } catch(error) {
        console.log(error);
    }
}