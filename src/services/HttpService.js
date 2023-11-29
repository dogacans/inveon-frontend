import axios from "axios";
import userManager from "../utils/userManager"
// const axios = require("axios");

class HttpService {
    constructor () {
        this.productsClient = axios.create({
            // baseURL: 'http://localhost:5001/' // gateway
            baseURL: 'http://localhost:5003/api'
        })

        this.cartClient = axios.create({
            // baseURL: 'http://localhost:5001/' // gateway
            baseURL: 'http://localhost:5004/api/cart'
        })
        this.access_token = null;
        
        this.cartClient.interceptors.request.use(async (config) => {
            const user = await userManager.getUser();
            if (user) {
                this.access_token = user.access_token;
            }
            config.headers.Authorization =  this.access_token ? `Bearer ${this.access_token}` : '';
            return config;
        });
        
    }

    async getAllProducts () {
        const response = await this.productsClient.get("products");
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
        const response = await this.productsClient.get(`products/${id}`, config);
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }

    async getAllProducts () {
        const response = await this.productsClient.get("products");
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }

    async addToCart (productId, size, count) {
        const response = await this.cartClient.post("AddProductToCart", {
            productId: productId, 
            size: size, 
            count: count
        });
        return (response.status === 200 && response.data.isSuccess)
    }

    async getCart () {
        const response = await this.cartClient.get(`GetCart`);
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }
    async deleteFromCart (productId, size) {
        const response = await this.cartClient.delete(`DeleteProductFromCart`,
        {
            
        }
        );
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }

    // async setUserToken () {
    //     const user = await userManager.getUser();
    //     this.access_token = user.access_token;
    //     this.cartClient.defaults.headers['Authorization'] = `Bearer ${this.access_token}`
    // }
}

export default new HttpService();