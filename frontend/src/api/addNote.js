import axios from "axios";

export const addNoteApi = async (payload) => {
 console.log(payload , "in the file api")
    try {
        const response = await axios.post("http://localhost:5005/api/v1/notes/createNote", payload);
        return response;

    } catch(error) {
        console.log(error);
    }
}