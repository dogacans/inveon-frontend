import axios from "axios";

// const axios = require("axios");

class HttpService {
    constructor () {
        this.client = axios.create({
            // baseURL: 'http://localhost:5001/' // gateway
            baseURL: 'http://localhost:5003/api'
        })
    }

    async getAllProducts () {
        const response = await this.client.get("products");
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }

    async getProductById (id, access_token) {
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        };
        const response = await this.client.get(`products/${id}`, config);
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }

    async getAllProducts () {
        const response = await this.client.get("products");
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }
}
export default new HttpService();