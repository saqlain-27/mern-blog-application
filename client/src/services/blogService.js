import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export  const fetchBlogs = ({ page = 1, limit = 6 }) =>{
    return axios.get(`${API}/blogs?page=${page}&limit=${limit}`);
};

export const createBlog = (data) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API}/blogs`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const fetchMyBlogs = ({page = 1, limit = 6}) =>{
    const token = localStorage.getItem("token");

    return axios.get(`${API}/blogs/me?page=${page}&limit=${limit}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};

export const deleteBlog = (id) =>{
    const token = localStorage.getItem("token");

    return axios.delete(`${API}/blogs/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};

export const fetchBlogById = (id) =>{
    const token = localStorage.getItem("token");
    return axios.get(`${API}/blogs/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
}; 

export const updateBlog = (id,data) => {
    const token = localStorage.getItem("token");
    return axios.patch(`${API}/blogs/${id}`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};

export const toggleLike = (id) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API}/blogs/${id}/like`,{},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};

export const addComment = (id, text) =>{
    const token = localStorage.getItem("token");
    return axios.post(`${API}/blogs/${id}/comment`, {text }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
};