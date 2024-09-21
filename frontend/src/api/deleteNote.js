import axios from "axios";

export const deleteNoteApi = async (_id) => {
 
    try {
        const response = await axios.delete(`http://localhost:5005/api/v1/notes/removeNote/${_id}`);
        return response;

    } catch(error) {
        console.log(error);
    }
}