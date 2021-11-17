import fs from "fs";

const uploadImage = async (req: any, res: any, next: any) => {
    try {
        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({msg: "No files were uploaded."});
        }
            
        const file = req.files.file;

        if(file.size > 1024 * 1024){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg: "Size too large."});
        }

        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg: "File format is incorrect."})
        }

        next();
    } catch (err: any) {
        return res.status(500).json({msg: err.message});
    }
};

const removeTmp = (path: string) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
};

export default uploadImage;