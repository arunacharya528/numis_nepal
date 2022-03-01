import axios from 'axios';
const apiBaseURL = 'http://localhost:3000/api'
const qs = require('qs');


export const getCollectibles = async () => {
    let config = {
        method: "get",
        url: `${apiBaseURL}/collectible`,
        headers: {}
    };

    return axios(config);
}

export const postCollectible = async (collectible) => { 
    let data = qs.stringify(collectible);
    let config = {
        method: 'post',
        url: `${apiBaseURL}/collectible/`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);

}