import axios from 'axios';

const gApiToken = "AIzaSyBh8bdpRDd_5KFyMtkU89Ap784qD7HWnRU";
export const api = axios.create({
    baseURL: "https://content.googleapis.com/youtube/v3",
    timeout: 3000,
    params: {
        key: gApiToken,
    }
});

export default api;
