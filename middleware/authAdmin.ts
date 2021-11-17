import jwt from "jsonwebtoken"
import Users from "../models/userModel"

const authAdmin = async (req: any, res: any, next: any) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).json({err: "Invalid Authentication"})
        }
    
        const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
    
        if(!access_token_secret){
            return res.status(500).json({err: "Something went wrong"});
        }
    
        const decoded: any = jwt.verify(token, access_token_secret)
        if(!decoded){
            return res.status(400).json({err: "Invalid Authentication"});
        }
    
        const user = await Users.findOne({_id: decoded.id});
        if(!user || user.role !== "admin"){
            return res.status(400).json({err: "Invalid Authentication"});
        }
    
        next();
    }catch (err: any){
        return res.status(500).json({err: err.message});
    }
}

export default authAdmin