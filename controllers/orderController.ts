import Orders from "../models/orderModel";
import Products from "../models/productModel";

interface Product{
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sold: number;
    category: string;
    images: string[];
}

const orderCtrl = {
    order: async (req: any, res: any) => {
        try {
            const {name, email, phoneNumber, products, address, city, date} = req.body;
            if(!name || !email || !phoneNumber || !products || !address || !city || !date){
                return res.status(400).json({err: "Please fill in all fields"});
            }

            let total = 0;
            let soldProductIds: string[] = [];

            products
                .filter((product: Product) => !soldProductIds.includes(product._id))
                .forEach((product: Product) => {
                    if(!soldProductIds.includes(product._id)){
                        let quantity = products.filter((p: Product) => p._id === product._id).length;
                        total += (product.price * quantity);
                        soldProductIds.push(product._id);
                        sell(product._id, quantity, product.sold, product.stock);
                    }
                });

            const newOrder = new Orders({
                name, 
                email, 
                phoneNumber, 
                products, 
                address, 
                city, 
                date, 
                total
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

const sell = async (id: string, quantity: number, oldSold: number, oldStock: number) => {
    let newSold = oldSold + quantity;
    let newQuantity = oldStock - quantity;

    await Products.findByIdAndUpdate({_id: id}, {
        sold: newSold,
        stock: newQuantity,
    });
}

export default orderCtrl;