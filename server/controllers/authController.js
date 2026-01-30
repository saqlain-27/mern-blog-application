import { registerUser, authenticateUser } from "../services/authService.js";

export const register = async (req, res) => {
   try {
    const { username, email, password } = req.body;

    const result =await registerUser({username, email, password });
   
    return res.status(result.status).json({ message: result.message });
   
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
   }
};

export const login =async (req, res) => {
    try {
    const { email, password } = req.body;

    const result =await authenticateUser({ email, password });

    if (!result.ok)
        return res.status(result.status).json({ message: result.message });

    return res.status(result.status).json({
        message:result.message,
        token: result.token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};