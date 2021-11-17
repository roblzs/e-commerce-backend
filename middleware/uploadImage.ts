import fs from "fs";

const uploadImage = async (req: any, res: any, next: any) => {
    try {
        const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env;

        if(!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET){
            return res.status(500).json({err: "Something went wrong"});
        }

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({err: "No files were uploaded."});
        }
            
        const file = req.files[Object.keys(req.files)[0]];
        if(!file){
            return res.status(400).json({err: "No files were uploaded."});
        }

        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath);
            return res.status(400).json({err: "Size too large."});
        }

        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            removeTmp(file.tempFilePath);
            return res.status(400).json({err: "File format is incorrect."})
        }

        next();
    } catch (err: any) {
        return res.status(500).json({err: err.message});
    }
};

const removeTmp = (path: string) => {
    fs.unlink(path, (err) => {
        if(err) throw err;
    });
};

export default uploadImage;