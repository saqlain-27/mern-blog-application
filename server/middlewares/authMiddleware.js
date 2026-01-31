import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({message: "No bearer provided"});
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... sent from client
    //authHeader === "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    const token = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        //split the token into 3 n recreate the signature ... returns payload if token is verified
        req.user = decode;
        next();
    } catch (error){
        return res.status(401).json({ message: "Please log in to continue." });
    }

}

export default authMiddleware;
