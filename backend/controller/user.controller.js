import { addUser } from '../config/firebase.js';  

export const createUser = async (req, res) => { 
    try {
        const data = req.body;
        await addUser(data); 
        return res.json({ message: "User added", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

