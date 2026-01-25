import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blogService";
import toast from "react-hot-toast";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createBlog({title, content});
            toast.success("Blog published!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create blog");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-8">
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"> Create New Blog </h1>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1"> Title </label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        rows="6"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
                    Publish Blog
                </button>
            </form>
        </div>
    )

}