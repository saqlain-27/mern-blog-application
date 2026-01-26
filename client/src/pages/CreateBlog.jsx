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
            toast.error(error.response?.data?.message || "Failed to create blog");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 flex items-center justify-center pt-24 pb-8">

        <form onSubmit={handleSubmit} className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    Create New Blog
                </h1>
                <p className="text-gray-600">Share your thoughts with the world</p>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Title</span>
                </label>
                <input type="text" className="w-full border-2 border-gray-200 rounded-xl px-5 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition duration-300 text-lg" 
                value={title} 
                onChange={(e) =>setTitle(e.target.value) } required />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Content</span>
                </label>
                <textarea rows="6"
                    className="w-full border-2 border-gray-200 rounded-xl px-5 py-4 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition duration-300 text-base resize-y min-h-[200px]"
                    value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button type="button" 
                    onClick={() => navigate('/dashboard')} 
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex-1">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex-1 flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Publish Blog</span>
                </button>
            </div>

        </form>
        </div>
    )

}