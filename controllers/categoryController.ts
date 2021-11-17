import Categories from "../models/categoryModel";

const categoryCtrl = {
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