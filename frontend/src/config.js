const isProduction = true;

const config = {
    apiUrl: isProduction 
        ? "https://note-taking-app-5ry3.vercel.app/api/v1/notes" 
        : "http://localhost:5005/api/v1/notes"
};

export default config;