import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
const initialState = {
  products: [],
  singleProduct: null,
  productsStatus: 'idle',
  singleProductStatus: 'idle',
  error: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductById: (state, action) => {
            let { id } = action.payload;
            let urunDetay = state.products.find(item => item.id === parseInt(id))
            state.single = urunDetay
        },
        getAllProducts: (state, action) => {
            let products = state.products.products;
            state.products = products;
        },
    },
    extraReducers(builder) {
        builder
          .addCase(fetchProducts.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(fetchProductById.pending, (state, action) => {
            state.singleProductStatus = 'loading'
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.singleProductStatus = 'succeeded'
            // Add any fetched posts to the array
            console.log("sonuç: ", action.payload)
            state.singleProduct = action.payload
          })
          .addCase(fetchProductById.rejected, (state, action) => {
            state.singleProductStatus = 'failed'
            state.error = action.error.message
          })
      }
})
export default productsSlice.reducer
export const selectAllProducts = state => state.products.products
export const selectProductById = productId => state => state.products.products.find(prod => prod.id === productId)

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const data = await HttpService.getAllProducts();
    return data
})

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const data = await HttpService.getProductById(id);
    return data;
})
