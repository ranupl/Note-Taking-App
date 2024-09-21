import axios from "axios";

export const getNoteApi = async () => {
   
    try {
        // const response = await axios.get("http://localhost:5005/api/v1/notes/listNotes");
        const response = await axios.get("https://note-taking-app-5ry3.vercel.app/api/v1/notes/listNotes");
        return response;

    } catch(error) {
        console.log(error);
    }
}