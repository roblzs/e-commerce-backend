import cloudinary from "cloudinary";
import fs from "fs";

const uploadCtrl = {
    upload: (req: any, res: any) => {
        try {
            const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env;
            if(!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET){
                return res.status(500).json({err: "Something went wrong"});
            }

            cloudinary.v2.config({
                cloud_name: CLOUD_NAME,
                api_key: CLOUD_API_KEY,
                api_secret: CLOUD_API_SECRET
            });

            const file = req.files[Object.keys(req.files)[0]];
            if(!file){
                return res.status(400).json({err: "No files were uploaded."});
            }

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: "products", width: 200, height: 200, crop: "fill"
            }, async(err, result) => {
                if(err) throw err;

                removeTmp(file.tempFilePath);

                if(!result){
                    return res.status(500).json({err: "Something went wrong"});
                }

                res.json({url: result.secure_url});
            })
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    }
};

const removeTmp = (path: string) => {
    fs.unlink(path, (err) => {
        if(err) throw err;
    });
};

export default uploadCtrl;