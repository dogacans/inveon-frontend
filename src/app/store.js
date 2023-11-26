import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./slices/product";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import favoritesReducer from "./slices/favorites"
import cartReducer from "./slices/cart"

export const store = configureStore ( {
    reducer : {
        products : productsReducer,
        favorites: favoritesReducer,
        cart: cartReducer,
        user : userReducer,
        settings : settingsReducer
    }
})
