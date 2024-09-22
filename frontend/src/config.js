const isProduction = process.env.NODE_ENV === 'production';

const config = {
    apiUrl: isProduction 
        ? "https://note-taking-app-5ry3.vercel.app" 
        : "http://localhost:5005"
};

export default config;