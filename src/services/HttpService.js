import axios from "axios";
import userManager from "../utils/userManager"
// const axios = require("axios");

class HttpService {
    constructor () {
        this.productsClient = axios.create({
            baseURL: 'http://localhost:5003/api'
        })

        this.cartClient = axios.create({
            baseURL: 'http://localhost:5004/api/cart'
        })

        this.reviewsClient = axios.create({
            baseURL: 'http://localhost:5007/api'
        })

        this.favoritesClient = axios.create({
            baseURL: 'http://localhost:5008/api'
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

        this.reviewsClient.interceptors.request.use(async (config) => {
            const user = await userManager.getUser();
            if (user) {
                this.access_token = user.access_token;
            }
            config.headers.Authorization =  this.access_token ? `Bearer ${this.access_token}` : '';
            return config;
        });

        this.favoritesClient.interceptors.request.use(async (config) => {
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

    async getFavorites () {
        const response = await this.favoritesClient.get(`getFavorites`);
        if (response.status === 200) {
            return response.data;
        }
        else {
            throw new Error("Cannot get all products!");
        }
    }

    async addToFavorites (productId) {
        const response = await this.favoritesClient.post(`addFavorite`, {productId});
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot add item to favorites!");
        }
    }

    async removeFromFavorites (productId) {
        const response = await this.favoritesClient.delete(`deleteFromFavorites`, {data: {productId}});
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            throw new Error("Cannot delete item from favorites!");
        }
    }

    async deleteFromCart (productId, size) {
        const response = await this.cartClient.delete(`DeleteProductFromCart`,
            {data: {productId,size}}
        );
        return (response.status === 200 && response.data.isSuccess)
    }

    async getReviews (productId) {
        const response = await this.reviewsClient.get(`reviews/${productId}`);
        if (response.status === 200) {
            return response.data
        }
        else {
            throw new Error(`Cannot get reviews for product: ${productId}`);
        }
    }

    async postReview(productId, review) {
        try {
            const postData = {
                ProductId: productId,
                Comment: review.comment,
                Rating: review.rating
            };
    
            const response = await this.reviewsClient.post(`addReview`, postData);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Cannot post review for product: ${productId}`);
            }
        } catch (error) {
            console.error('Error posting review:', error.message);
            throw error;
        }
    }

    async setUserToken () {
        const user = await userManager.getUser();
        this.access_token = user.access_token;
        this.cartClient.defaults.headers['Authorization'] = `Bearer ${this.access_token}`
    }
}

export default new HttpService();