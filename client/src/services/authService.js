import axios from "axios";

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const registerUser = (data) =>{
    return axios.post(`${API}/auth/register`,data);
}

export const loginUser = async(data)=>{
    const res =await axios.post(`${API}/auth/login`,data);

    if(res.data.token)
        localStorage.setItem("token",res.data.token);

    return res;
}

