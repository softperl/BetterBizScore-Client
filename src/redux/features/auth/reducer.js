import { createSlice } from '@reduxjs/toolkit'
import { login, signup, logout } from './actions'

const initialState = {
   loading: false,
   user: {},
   userToken: null, // for storing the JWT
   error: null,
   success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.success = true;
         state.user = action.payload.user;
         state.userToken = action.payload.token;
      },
      removeUser: (state) => {
         state.success = false;
         state.user = {}
         state.userToken = null;
      },
      setError: (state, action) => {
         state.loading = false;
         state.error = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(signup.pending, (state) => {
         state.loading = true
         state.error = null
      })
      builder.addCase(signup.fulfilled, (state, { payload }) => {
         ;
         state.loading = false
         state.success = true // signup successful
         state.user = payload.data.user;
         state.userToken = payload.token;
      })
      builder.addCase(signup.rejected, (state, { payload }) => {
         state.loading = false
         state.user = {}
         state.userToken = null;
         state.success = false;
         state.error = payload;
      })

      builder.addCase(login.pending, (state) => {
         state.loading = true
         state.error = null
      })
      builder.addCase(login.fulfilled, (state, { payload }) => {
         state.loading = false
         state.success = true // login successful
         state.user = payload.data.user;
         state.userToken = payload.token;
      })
      builder.addCase(login.rejected, (state, { payload }) => {
         state.loading = false
         state.user = {}
         state.userToken = null;
         state.success = false;
         state.error = payload;
      })

      builder.addCase(logout.fulfilled, (state, { payload }) => {
         state.loading = false
         state.success = false // logout successful
         state.user = {};
         state.userToken = null;
      })
   }
})

export const { setUser, removeUser, setError } = authSlice.actions;

export default authSlice.reducer