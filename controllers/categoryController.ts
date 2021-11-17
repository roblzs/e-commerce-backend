import Categories from "../models/categoryModel";

const categoryCtrl = {
    create: async (req: any, res: any) => {
        try {
            const {text} = req.body;

            const newCategory = new Categories({
                text
            });

            await newCategory.save();

            res.json({msg: "Create Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    update: async (req: any, res: any) => {
        try {
            const {text} = req.body;

            const categoryId = req.params.id;
            if(!categoryId){
                return res.status(500).json({err: "Something went wrong"});
            }

            await Categories.findOneAndUpdate({_id: categoryId}, {
                text
            });

            res.json({msg: "Update Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
};

export default categoryCtrl;