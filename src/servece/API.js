import axios from 'axios'
import { getUserData } from './Storage'

axios.defaults.baseURL="https://identitytoolkit.googleapis.com/v1"
const API_KEY="AIzaSyA8Z8LWQS6iC590vzePxlgKbM_WSwdMCbg"
const REGISTER_URL=`/accounts:signUp?key=${API_KEY}`
const LOGIN_URL=`/accounts:signInWithPassword?key=${API_KEY}`
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;

export const RegisterApi =(input)=>{
let data ={displayName:input.name,email:input.email,password:input.password}
 return axios.post(REGISTER_URL,data)
}

export const LoginApi =(input)=>{
    let data ={email:input.email,password:input.password}
     return axios.post(LOGIN_URL,data)
    }

    export const UserDetailsApi = ()=>{
        let data = {idToken:getUserData()}
        return axios.post(USER_DETAILS_URL,data)
    }    