import jwt from "jsonwebtoken"
import Users from "../models/userModel"

const authAdmin = async (req: any, res: any) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(400).json({err: "Invalid Authentication."})
    }

    if(process.env.ACCESS_TOKEN_SECRET){
        const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if(!decoded){
            return res.status(400).json({err: "Invalid Authentication."});
        }else{
            const user = await Users.findOne({_id: decoded.id});

            if(user.role !== "admin"){
                return res.status(400).json({err: "Invalid Authentication."});
            }

            return user;
        }
    }
}

export default authAdmin