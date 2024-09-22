const isProduction = process.env.NODE_ENV === 'production';

const config = {
    apiUrl: isProduction 
        ? "https://your-production-url.com/api/v1/notes" 
        : "http://localhost:5005/api/v1/notes"
};

export default config;