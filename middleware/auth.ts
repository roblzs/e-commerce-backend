import jwt from "jsonwebtoken"

const auth = async (req: any, res: any, next: any) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).json({err: "Invalid Authentication."})
        }

        const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
        if(!access_token_secret){
            return res.status(500).json({err: "Something went wrong"});
        }

        const decoded: any = jwt.verify(token, access_token_secret);
        if(!decoded){
            return res.status(400).json({err: "Invalid Authentication."});
        }
         
        next();
    }catch (err: any){
        res.status(500).json({err: err.message});
    }
}

export default auth