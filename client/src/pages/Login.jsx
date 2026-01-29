import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

export default function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault(); //prevents browser re-fresh which was normal behavious

        try{
            const res = await loginUser({email, password});
            console.log(res.data.message);
            toast.success(res.data.message);
            if (res.status===200)
                navigate("/dashboard");
        }
        catch(err){
            const errorMessage = err.response?.data?.message || err.message || "Login failed";
            toast.error(errorMessage);
        }

    }

    return(
        
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 pt-24">

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">

                <div className="text-center mb-8">
                    <div className="mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Welcome Back to BlogHub</h2>
                    <p className="text-gray-500 mt-2">Sign in to your blogging account</p>
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300" 
                        onChange={(e)=> setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300" 
                        placeholder="••••••••" 
                        onChange={(e)=> setPassword(e.target.value)} 
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition duration-300 ease-in-out"
                >
                    Sign In
                </button>

                <div className="mt-6 text-center">
                    <button type="button" onClick={() => navigate("/register")} 
                        className="text-indigo-600 hover:text-indigo-800 font-medium">
                        New user? <span className="underline">Create an account</span>
                    </button>
                </div>

            </form>

        </div>

    )

}