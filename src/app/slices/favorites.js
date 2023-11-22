import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import HttpService from "../../services/HttpService";

const initialState = {
  products: [],
  status: 'idle',
  error: null
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            let { id } = action.payload;
            let item = state.favorites.find(item => item.id === parseInt(id))
            if (item === undefined) {
                let urunFavori = state.products.find(item => item.id === parseInt(id))
                urunFavori.quantity = 1
                state.favorites.push(urunFavori)
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: 'İlgili ürün favorilere eklenmiştir',
                        icon: 'success'
                    }

                )

            }
            else {
                Swal.fire('Başarsız', 'İlgili ürün favorilere eklenemedi', 'warning')
            }

        },
        removeToFav: (state, action) => {
            let { id } = action.payload;
            let favorilerinOnSonHali = state.favorites.filter(item => item.id !== parseInt(id))
            state.favorites = favorilerinOnSonHali
        },
        //favorileri temizle
        clearFav: (state) => {
            state.favorites = [] // state içindeki favori arrayını temizlemiş oluyor 
        },
    }
})
export default favoritesSlice.reducer
export const selectAllFavorites = state => state.products.products

// export const fetchFavorites = createAsyncThunk('products/fetchProducts', async () => {
//     const data = await HttpService.getAllProducts();
//     return data
// })
