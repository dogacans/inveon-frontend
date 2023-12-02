import Swal from "sweetalert2";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import HttpService from "../../services/HttpService";
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
            console.log('action.payload: ', action.payload);
            let productInCart = state.products.find(item => item.productId === product.productId && item.size === product.size)
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
        showInCart: (state, action) => {
            let { product, count, size } = action.payload;
            console.log('action.payload: ', action.payload);
            state.products.push({
                ...product,
                count: count, 
                size: size
            })
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
            let { productId, size } = action.payload;
            console.log('state.products: ', state.products);
            let filteredCart = state.products.filter(item => !(item.size === size && item.productId === productId))
            state.products= filteredCart
        },
        //sepeti comple silmek için
        clearCart: (state) => {
            state.products = []
        },
    },
    extraReducers(builder) {
        builder
          .addCase(getCart.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(getCart.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            const {cartItems, products} = action.payload
            state.products = cartItems.map(item => {

                const product = products.find(product => product.productId === item.productId)
                return (
                    {
                        ...product,
                        productId: item.productId,
                        quantity: item.count,
                        size: item.size
                    }
                )
            });
          })
          .addCase(getCart.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
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

// export function ccCart() {
//     return async (dispatch, getState) => {
//         // you can use api and something else here
//         const state = getState();

//         const cart = await getCart();
//         cart.map(item => {
//             let product = null;
    
//             if (state.products.singleProduct?.productId === item.productId) {
//                 product = state.products.singleProduct
//             }
//             else {
//                 product = state.products.products.find(prod => prod.productId === item.productId)
//             }
    
//             if (product) {
//                 dispatch({ type: "cart/showInCart", payload: { ...product, size: item.size, quantity: item.count } })
//             }
//         })
//     }
//   }

export const getCart = createAsyncThunk('cart/getCartItems', async () => {
        const data = await HttpService.getCart();
        const products = await HttpService.getAllProducts();
        return {cartItems: data, products: products}
})

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
