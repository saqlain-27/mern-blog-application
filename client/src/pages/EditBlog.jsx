import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBlogById, updateBlog } from "../services/blogService";
import toast from "react-hot-toast";

export default function EditBlog(){
    const { id } = useParams(); //useParams returnd a obj so destruct it with {}
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadBlogs = async () => {
            try {
                const res = await fetchBlogById(id);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (error) {
                console.error((error));
                toast.error("Unable to load blog");
                setTimeout(() => {
                  navigate("/dashboard");
                }, 1500);            
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    },[id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBlog(id,{title, content});
            toast.success("Blog updated");
            navigate("/dashboard");
        } catch (error) {
            alert("failed to update blog")
        }  
    };

    if(loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading blog...
      </div>
        )

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Edit Blog </h1>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1"> 
                Title </label>
                <input type="text" className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                value={title} 
                onChange={(e) =>setTitle(e.target.value) } required />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Content</label>
                <textarea rows="6"
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} required />
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Save Changes
            </button>

        </form>
        </div>

    )



}