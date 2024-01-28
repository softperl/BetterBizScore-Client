// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const baseURL = 'http://api.betterbizscore.com'

export const signup = createAsyncThunk(
   'auth/signup',
   async ({
      name,
      email,
      password,
      passwordConfirm
   }, {
      rejectWithValue: reject
   }) => {
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true
         }
         const response = await axios.post(
            `${baseURL}/api/users/signup`,
            { name, email, password, passwordConfirm },
            config
         )

         if (response.data.token) {
            localStorage.setItem('__token_bzc_client', response.data.token);
            localStorage.setItem('__user_bzc_client', JSON.stringify(response.data?.data?.user));
         }

         return response.data;
      } catch (error) {
         if (error.response?.data.message) {
            return reject(error.response.data.message)
         } else {
            return reject(error.message)
         }
      }
   }
)

export const login = createAsyncThunk(
   'auth/login',
   async ({
      email,
      password
   }, {
      rejectWithValue: reject
   }) => {
      try {
         const response = await axios.post(
            `${baseURL}/api/users/login`,
            { email, password },
            {
               headers: {
                  'Content-Type': 'application/json'
               },
               withCredentials: true
            }
         )

         if (response.data.token) {
            localStorage.setItem('__token_bzc_client', response.data.token);
            localStorage.setItem('__user_bzc_client', JSON.stringify(response.data?.data?.user));
         }

         return response.data;
      } catch (error) {
         if (error.response?.data.message) {
            return reject(error.response.data.message)
         }
         else {
            return reject(error.message)
         }
      }
   }
)

export const logout = createAsyncThunk(
   'auth/logout',
   async (_, {
      rejectWithValue: reject
   }) => {
      try {
         const config = {
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true
         }
         const response = await axios.get(
            `${baseURL}/api/users/logout`,
            {},
            config
         )

         if (response.data.status === 'success') {
            localStorage.removeItem('__user_bzc_client');
            localStorage.removeItem('__token_bzc_client');
         };

         return response.data;
      } catch (error) {
         if (error.response?.data.message) {
            return reject(error.response.data.message)
         }
         else {
            return reject(error.message)
         }
      }
   }
)