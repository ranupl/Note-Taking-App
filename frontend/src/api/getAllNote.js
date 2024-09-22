import axios from "axios";
import config from '../config';


export const getNoteApi = async () => {
    const email = localStorage.getItem("email");
    try {
        const response = await axios.get(`${config.apiUrl}/listNotes/${email}`);
        return response;

    } catch(error) {
        console.log(error);
    }
}