<h1>e-commerce backend</h1>
<p>🌐 MERN backend template for e-commerce websites</p>

<h2>How to run locally</h2>

1. Download node from <a href="https://nodejs.org/en/download/">here</a>
2. Download git from <a href="https://git-scm.com/downloads">here</a>
3. Install yarn ```npm install --global yarn```
4. Get source code ```git clone https://github.com/RobzLegz/e-commerce-backend backend```
5. ```cd backend```
6. Install dependencies ```yarn install```
7. Create .env file ```touch .env```
8. Update .env file

```
PORT=
MONGODB_URL=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_SECRET=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
```

<p><code>PORT</code> can be a random 4 digit number, I'd suggest 5000</p>
<p>Create a mongodb project by following this <a href="https://www.youtube.com/watch?v=6utzRKiBZt0">tutorial</a> and update MONGODB_URL in .env file</p>
<p>You can create <code>REFRESH_TOKEN_SECRET</code> and <code>ACCESS_TOKEN_SECRET</code> by generating secure 50 character password <a href="https://passwordsgenerator.net/">here</a></p>
<p><code>CLOUD_NAME</code> & <code>CLOUD_API_KEY</code> & <code>CLOUD_API_SECRET</code> are accessible when You register to <a href="https://cloudinary.com/">cloudinary</a>

9. run project ```yarn dev```
  
<h2>API routes</h2>

```ts
app.use("/api/user", userRouter); //http://localhost:5000/api/user
app.use("/api/categories", categoryRouter); //http://localhost:5000/api/categories
app.use("/api/upload", uploadRouter); //http://localhost:5000/api/upload
app.use("/api/products", productRouter); //http://localhost:5000/api/products
app.use("/api/orders", orderRouter); //http://localhost:5000/api/orders
```
<h2>Order handling</h2>

```ts
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
```
```ts
const sell = async (id: string, quantity: number, oldSold: number, oldStock: number) => {
    let newSold = oldSold + quantity;
    let newQuantity = oldStock - quantity;

    await Products.findByIdAndUpdate({_id: id}, {
        sold: newSold,
        stock: newQuantity,
    });
}
```
