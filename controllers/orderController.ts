import Orders from "../models/orderModel";

interface Product{
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
}

const categoryCtrl = {
    order: async (req: any, res: any) => {
        try {
            const {name, email, phoneNumber, products, address, city, date} = req.body;
            if(!name || !email || !phoneNumber || !products || !address || !city || !date){
                return res.status(400).json({err: "Please fill in all fields"});
            }

            let total = 0;
            products.forEach((product: Product) => {
                total += product.price;
            });

            const newOrder = new Orders({
                name, email, phoneNumber, products, address, city, date, total
            });

            await newOrder.save();

            res.json({msg: "Order received, check Your email"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    getAll: async (req: any, res: any) => {
        try {
            const orders = await Orders.find();

            res.json(orders);
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    getOne: async (req: any, res: any) => {
        try {
            const orderId = req.params.id;
            if(!orderId){
                return res.status(500).json({err: "Something went wrong"});
            }

            const order = await Orders.findById({_id: orderId});

            res.json(order);
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
    delete: async (req: any, res: any) => {
        try {
            const orderId = req.params.id;
            if(!orderId){
                return res.status(500).json({err: "Something went wrong"});
            }

            await Orders.findByIdAndDelete({_id: orderId});

            res.json({msg: "Delete Success"});
        } catch (err: any) {
            return res.status(500).json({err: err.message});
        }
    },
};

export default categoryCtrl;