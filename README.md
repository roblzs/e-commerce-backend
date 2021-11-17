# e-commerce backend
🌐 MERN backend template for e-commerce websites

## How to run locally:
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
<p>Create a mongodb project by following this <a href="https://www.youtube.com/watch?v=6utzRKiBZt0">tutorial</a> and update MONGODB_URL in .env file</p>
<p>You can create <code>REFRESH_TOKEN_SECRET</code> and <code>ACCESS_TOKEN_SECRET</code> by generating secure 50 character password <a href="https://passwordsgenerator.net/">here</a></p>
<p><code>CLOUD_NAME</code> & <code>CLOUD_API_KEY</code> & <code>CLOUD_API_SECRET</code> are accessible when You register to <a href="https://cloudinary.com/">cloudinary</a>
9. run project ```yarn dev```
