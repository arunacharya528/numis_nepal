import axios from 'axios';
const apiBaseURL = 'http://localhost:3000/api'



export const getClients = async () => {
    let config = {
        method: "get",
        url: `${apiBaseURL}/client`,
        headers: {}
    };

    return axios(config);
}