import Products from "../models/productModel";

const productCtrl = {
    create: async (req: any, res: any) => {
        try {
            const {name, description, price, stock, category, images} = req.body;
            if(!name || !description || !price || !stock || !category || !images){
                return res.status(400).json({err: "Please enter all fields"});
            }

            const newProduct = new Products({
                name, description, price, stock, category, images
            });

            await newProduct.save();

            res.json({msg: "Create Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    get: async (req: any, res: any) => {
        try {
            const products = await Products.find();

            res.json(products);
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    update: async (req: any, res: any) => {
        try {
            const {name, description, price, stock, category, images} = req.body;

            const productId = req.params.id;
            if(!productId){
                return res.status(500).json({err: "Something went wrong"});
            }

            await Products.findByIdAndUpdate({_id: productId}, {
                name, description, price, stock, category, images
            });

            res.json({msg: "Update Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    delete: async (req: any, res: any) => {
        try {
            const productId = req.params.id;
            if(!productId){
                return res.status(500).json({err: "Something went wrong"});
            }

            await Products.findByIdAndDelete({_id: productId});

            res.json({msg: "Delete Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
};

export default productCtrl;