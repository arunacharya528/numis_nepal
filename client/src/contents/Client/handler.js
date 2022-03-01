import axios from 'axios';
const apiBaseURL = 'http://localhost:3000/api'
const qs = require('qs')

export const getClients = async () => {
    let config = {
        method: "get",
        url: `${apiBaseURL}/client`,
        headers: {}
    };

    return axios(config);
}

export const postClient = async (client) => {
    let data = qs.stringify(client);
    let config = {
        method: 'post',
        url: `${apiBaseURL}/client/`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);

}