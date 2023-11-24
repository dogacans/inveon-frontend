import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: false,
        status: false,
        user: {}
    },
    reducers: {
        login: (state, action) => {
            console.log("login received!!!!")
            console.log('state: ', state);
            console.log('action: ', action);

            state.status = action.payload.status
            state.loggedIn = action.payload.status
            //rest api den gelen veriye göre değiştirebilir. 
            state.user = action.payload.user
        },
        register: (state, action) => {
            let { name, email, pass } = action.payload;
            state.status = true
            state.user = {
                name: name,
                role: 'customer',
                email: email,
                pass: pass
            }
        },
        logout: (state) => {
            console.log("user slice logouta gelindi");
            state.status = false
            state.user = {

            }
        }
    }
})

const userReducer = userSlice.reducer
export default userReducer

export const userIsLoggedIn = (state) => state.user.loggedIn