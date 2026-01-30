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
            toast.error("failed to update blog")
        }  
    };

    if(loading)
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-24">
                <div className="text-center bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-lg max-w-sm mx-4 border border-slate-700">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                  <p className="text-gray-300 font-medium">Loading blog...</p>
                </div>
            </div>
        )

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 flex items-center justify-center pt-24 pb-8">

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800 to-slate-700 max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700">
            <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    Edit Blog
                </h1>
                <p className="text-gray-300">Update your blog post with new content</p>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mt-4"></div>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-cyan-300 mb-3 flex items-center space-x-2"> 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Title</span>
                </label>
                <input type="text" className="w-full bg-slate-900/50 border-2 border-slate-600 rounded-lg px-5 py-3 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition duration-200 text-lg text-gray-200 placeholder-gray-500" 
                placeholder="Enter blog title..."
                value={title} 
                onChange={(e) =>setTitle(e.target.value) } required />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-cyan-300 mb-3 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Content</span>
                </label>
                <textarea rows="8"
                    className="w-full bg-slate-900/50 border-2 border-slate-600 rounded-lg px-5 py-4 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition duration-200 text-base resize-y min-h-[250px] text-gray-200 placeholder-gray-500"
                    placeholder="Write your blog content here..."
                    value={content} onChange={(e) => setContent(e.target.value)} required />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button type="button" 
                    onClick={() => navigate('/dashboard')} 
                    className="px-6 py-3 bg-slate-700 text-gray-200 rounded-lg font-semibold hover:bg-slate-600 transition-colors flex-1 border border-slate-600">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl flex-1 flex items-center justify-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Save Changes</span>
                </button>
            </div>

        </form>
        </div>

    )



}