import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import HttpService from "../../services/HttpService";
import { fetchProductById } from "./product";
import userManager from "../../utils/userManager";

const initialState = {
  products: [],
  status: 'idle',
  error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        //sepete ürün eklemek için kullanılacak
        AddToCart: (state, action) => {
            let { product, count, size } = action.payload;
            let productInCart = state.products.find(item => item.id === product.id)
            try {
                if (productInCart) {
                    productInCart.quantity += count;
                }
                else {
                    state.products.push({...product, quantity: count, size: size});
                }
                
                
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün sepete eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
            }
            catch (e) {
                Swal.fire(
                    {
                        title: 'Başarısız oldum...',
                        text: "Ürün sepete eklenemedi :(",
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
            }
        },
        updateCart: (state, action) => {
            let { val, id } = action.payload;
            state.carts.forEach(item => {
                if (item.id === parseInt(id)) {
                    item.quantity = val
                }
            })
        },
        removeFromCart: (state, action) => {
            let { cartDetailsId } = action.payload;
            let sepetinOnSonHali = state.products.filter(item => item.cartDetailsId !== cartDetailsId)
            state.carts = sepetinOnSonHali
        },
        //sepeti comple silmek için
        clearCart: (state) => {
            state.carts = []
        },
    }
})
export default cartSlice.reducer
export const selectAllCartItems = state => state.cart.products

// export const fetchCart = createAsyncThunk('products/fetchProducts', async () => {
//     const products = getState();
//     return data
// })

export function addToCart(id, size, count) {
    return async (dispatch, getState) => {
        // you can use api and something else here
        const state = getState();
        let product = null;
        const user = await userManager.getUser();
        if (!user) {
            Swal.fire(
                {
                    title: 'Üye Girişi',
                    text: "Lütfen üye girişi yapınız!",
                    icon: 'warning',
                    showConfirmButton: true
                }
            )
            return;
            }

        if (state.products.singleProduct?.productId === id) {
            product = state.products.singleProduct
        }
        else {
            product = state.products.products.find(prod => prod.productId === id)
        }

        const success = await HttpService.addToCart(id, size, count)

        if (success) {
            dispatch({ type: "cart/AddToCart", payload: { product: product, count: count, size: size } })
        }
        else {
            Swal.fire(
                {
                    title: 'Başarısız oldum...',
                    text: "Ürün sepete eklenemedi :(",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
        }
    }
  }


export function deleteFromCart(productId, size) {
    return async (dispatch, getState) => {
        // you can use api and something else here
        const state = getState();

        const user = await userManager.getUser();
        if (!user) {
            Swal.fire(
                {
                    title: 'Üye Girişi',
                    text: "Lütfen üye girişi yapınız!",
                    icon: 'warning',
                    showConfirmButton: true
                }
            )
            return;
            }

        const success = await HttpService.deleteFromCart(productId, size)

        if (success) {
            dispatch({ type: "cart/removeFromCart", payload: { productId: productId, size: size } })
        }
        else {
            Swal.fire(
                {
                    title: 'Başarısız oldum...',
                    text: "Ürün sepetten silinemedi :(",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
        }
    }
  }
