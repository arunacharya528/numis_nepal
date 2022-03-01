import axios from 'axios';
const qs = require('qs');


const apiBaseURL = 'http://localhost:3000/api'



export const getInventory = async (url) => {
    let config = {
        method: 'get',
        url: url,
        headers: {}
    };

    return axios(config);
}

export const getBoughtInventory = async () => {
    let config = {
        method: 'get',
        url: `${apiBaseURL}/inventory?type=bought&status=delivered`,
        headers: {}
    };

    return axios(config);
}

export const postToInventory = async (inventory) => {

    let data = qs.stringify(inventory);
    let config = {
        method: 'post',
        url: `${apiBaseURL}/inventory`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
}

export const putToInventory = async (props, id) => {
    let data = qs.stringify({
        'status': props.status
    });
    let config = {
        method: 'put',
        url: `${apiBaseURL}/inventory/${id}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)

}