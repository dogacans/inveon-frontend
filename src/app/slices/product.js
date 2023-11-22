import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import HttpService from "../../services/HttpService";

const initialState = {
  products: [],
  status: 'idle',
  error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // //sepete ürün eklemek için kullanılacak
        // AddToCart: (state, action) => {
        //     let { id } = action.payload;
        //     let sepeteEklenecekUrun = state.carts.find(item => item.id === parseInt(id))
        //     if (sepeteEklenecekUrun === undefined) {
        //         //sepete eklemek istediğim ürün bilgilerine getirecek ilgili rest servisi çağırılır
        //         let item = state.products.find(item => item.id === parseInt(id))
        //         item.quantity = 1
        //         state.carts.push(item)
        //         Swal.fire(
        //             {
        //                 title: 'Başarılı',
        //                 text: "Ürün sepete eklendi!",
        //                 icon: 'success',
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             }
        //         )
        //     }
        // },
        getProductById: (state, action) => {
            let { id } = action.payload;
            let urunDetay = state.products.find(item => item.id === parseInt(id))
            state.single = urunDetay
        },
        getAllProducts: (state, action) => {
            let products = state.products.products;
            state.products = products;
        },
        // updateCart: (state, action) => {
        //     let { val, id } = action.payload;
        //     state.carts.forEach(item => {
        //         if (item.id === parseInt(id)) {
        //             item.quantity = val
        //         }
        //     })
        // },
        // removeCart: (state, action) => {
        //     let { id } = action.payload;
        //     let sepetinOnSonHali = state.carts.filter(item => item.id !== parseInt(id))
        //     state.carts = sepetinOnSonHali
        // },
        // //sepeti comple silmek için
        // clearCart: (state) => {
        //     state.carts = []
        // },
        // addToFavorites: (state, action) => {

        //     let { id } = action.payload;
        //     let item = state.favorites.find(item => item.id === parseInt(id))
        //     if (item === undefined) {
        //         let urunFavori = state.products.find(item => item.id === parseInt(id))
        //         urunFavori.quantity = 1
        //         state.favorites.push(urunFavori)
        //         Swal.fire(
        //             {
        //                 title: 'Başarılı',
        //                 text: 'İlgili ürün favorilere eklenmiştir',
        //                 icon: 'success'
        //             }

        //         )

        //     }
        //     else {
        //         Swal.fire('Başarsız', 'İlgili ürün favorilere eklenemedi', 'warning')
        //     }

        // },
        // removeToFav: (state, action) => {
        //     let { id } = action.payload;
        //     let favorilerinOnSonHali = state.favorites.filter(item => item.id !== parseInt(id))
        //     state.favorites = favorilerinOnSonHali
        // },
        // //favorileri temizle
        // clearFav: (state) => {
        //     state.favorites = [] // state içindeki favori arrayını temizlemiş oluyor 
        // },
        
    },
    extraReducers(builder) {
        builder
          .addCase(fetchProducts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.products = state.products = action.payload
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})
export default productsSlice.reducer
export const selectAllProducts = state => state.products.products
export const selectProductById = (state, productId) => state.products.products.find(prod => prod.id === productId)

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const data = await HttpService.getAllProducts();
    return data
})
