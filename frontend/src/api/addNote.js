import axios from "axios";
import config from '../config';

export const addNoteApi = async (payload) => {
    try {
        const email = localStorage.getItem("email");
        const updatedPayload = {
            ...payload,
            user: [
                {
                    email: email,   
                    editAccess: "true"
                }
            ]
        };

        const response = await axios.post(`${config.apiUrl}/createNote`, updatedPayload);

        return response;

    } catch (error) {
        console.log(error);
    }
};
