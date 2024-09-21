import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'; 
import noteRoutes from './routes/noteRoute.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.json({ message: "Working fine" });
});

app.use("/api/v1/users", userRoutes); 
app.use("/api/v1/notes", noteRoutes); 

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
