import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { validateEmail } from "../utils/valid";
import { createAccessToken, createRefreshToken } from "../utils/generateToken";

const userCtrl = {
    register: async (req: any, res: any) => {
        try {
            const {name, email, phoneNumber, password} = req.body;
            
            if(!name || !email || !password || !phoneNumber){
                return res.status(400).json({msg: "Please fill in all fields"});
            }

            if(!validateEmail(email)){
                return res.status(400).json({msg: "Invalid emails"});
            }

            const user = await Users.findOne({email});
            if(user){
                return res.status(400).json({msg: "This email already exists"});
            }

            if(password.length < 6){
                return res.status(400).json({msg: "Password must be at least 6 characters long"});
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new Users({
                name, 
                email, 
                phoneNumber,
                password: passwordHash
            });

            await newUser.save();

            const refresh_token = createRefreshToken({id: newUser._id});
            res.cookie("refreshtoken", refresh_token, {
                maxAge: 7*24*60*60*1000
            });

            res.json({
                msg: "Register Success!",
                refresh_token: refresh_token
            });
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        };
    },
    login: async (req: any, res: any) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email});
            if(!user){
                return res.status(400).json({msg: "A user with this email does not exist"});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg: "Incorrect password"});
            }

            const refresh_token = createRefreshToken({id: user._id});
            res.cookie("refreshtoken", refresh_token, {
                maxAge: 7*24*60*60*1000
            });

            res.json({
                msg: "Login success!",
                refresh_token: refresh_token
            });
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    getAccessToken: async (req: any, res: any) => {
        try{
            const rf_tokenSecret: string | undefined = process.env.REFRESH_TOKEN_SECRET;
    
            if(!rf_tokenSecret){
                return res.status(400).json({err: "Something went wrong!"});
            }
    
            const rf_token = req.headers.authorization;
            if(!rf_token){
                return res.status(400).json({err: "Please login now!"});
            }
    
            const result: any = jwt.verify(rf_token, rf_tokenSecret);
            if(!result){
                return res.status(400).json({err: "Your token is incorrect or has expired."});
            }
    
            const user = await Users.findById(result.id).select("-password");
            if(!user){
                return res.status(400).json({err: "User does not exist."})
            }
    
            const access_token = createAccessToken({id: user._id});
            res.json({
                access_token,
                user
            });
        }catch(err: any){
            return res.status(500).json({err: err.message})
        }
    },
    getUserInfo: async (req: any, res: any) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");

            res.json(user);
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    getAllUsers: async (req: any, res: any) => {
        try {
            const users = await Users.find().select("-password");

            res.json(users);
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    logout: async (req: any, res: any) => {
        try {
            res.clearCookie("refreshtoken", {path: "/user/refresh_token"});
            return res.json({msg: "Logged out"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    updateUser: async (req: any, res: any) => {
        try {
            const {name, email, phoneNumber} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {
                name, email, phoneNumber
            })

            res.json({msg: "Update Success"})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req: any, res: any) => {
        try {
            const {role} = req.body;

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            });

            res.json({msg: "Update Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    deleteUser: async (req: any, res: any) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Delete Success"})
        } catch (err: any) {
            return res.status(500).json({msg: err.message})
        }
    },
};

export default userCtrl;