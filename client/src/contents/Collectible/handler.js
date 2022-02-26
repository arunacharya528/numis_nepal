import axios from 'axios';
const apiBaseURL = 'http://localhost:3000/api'



export const getCollectibles = async () => {
    let config = {
        method: "get",
        url: `${apiBaseURL}/collectible`,
        headers: {}
    };

    return axios(config);
}