import { useState } from "react"
import { registerUser } from "../services/authService"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Register(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await registerUser({email,password})
            toast.success("Registered Successfully");
            navigate("/");
        }
        catch(err){
            toast.error(err.response?.data?.message || "Registration failed");
        }

    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4 pt-20">

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl">

                <div className="text-center mb-8">
                    <div className="mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM8 13.47c0-.6.2-1.16.54-1.63C9.8 10.1 11.7 9.5 13.73 9.5c1.95 0 3.76.55 5.02 1.74.34.3.54.86.54 1.63v2.93c0 .82-.67 1.5-1.5 1.5H6.5a1.5 1.5 0 01-1.5-1.5v-2.93zM10 15.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Join BlogHub</h2>
                    <p className="text-gray-500 mt-2">Start your blogging journey</p>
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-300" 
                        onChange={(e)=> setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-300" 
                        placeholder="••••••••" 
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:from-cyan-700 hover:to-blue-700 transform hover:-translate-y-0.5 transition duration-300 ease-in-out"
                >
                    Create Account
                </button>

                <div className="mt-6 text-center">
                    <button 
                        type="button" 
                        onClick={() => navigate("/")} 
                        className="text-cyan-600 hover:text-cyan-800 font-medium"
                    >
                        Already have an account? <span className="underline">Sign in</span>
                    </button>
                </div>

            </form>
        </div>
    )

}