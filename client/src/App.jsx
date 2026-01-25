import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Blogs from "./pages/Blogs"; 
import CreateBlog from "./pages/CreateBlog"; 
import EditBlog from "./pages/EditBlog"; 
import Navbar from "./components/Navbar";

import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={ 
            <PublicRoute> <Login /> </PublicRoute> } />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />

          <Route path="/create" element={
            <ProtectedRoute> <CreateBlog /> </ProtectedRoute> } />

            <Route path="/edit/:id" element={
              <ProtectedRoute> <EditBlog/> </ProtectedRoute>
            } />
      
          <Route path="/blogs" element={<Blogs />} />

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
