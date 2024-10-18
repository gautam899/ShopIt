# MERN stack E-Commerce Website.
MERN Ecommerce is a full-stack application designed to transform your online shopping experience. Built with the MERN stack (MongoDB, Express.js, React, Node.js). This project offers a robust platform for both users and admins, packed with essential features for a seamless experience.

![image](https://github.com/user-attachments/assets/44642a6c-de4e-43f0-90e5-bf669ca06b73)

![image](https://github.com/user-attachments/assets/aaefee2d-05ec-45db-aff2-4df81ba1fe07)

## Tech Stack Used
1. MongoDB for database
2. Express
3. ReactJs
4. NodeJs

# Features
### User:
1. Registration of user with Email verification using nodemailer.
2. Forgot your password, no worries. Reset password functionality using nodemailer.
3. Fully responsive with impressive user experience on mobile and even larger screens. 
4. Product filter and search option. You can filter by gender or by type of wear, such as top-wear, mid-wear, or bottom-wear.
5. Sort products based on the price from low to high or high to low.
6. Create product reviews by giving them a rating out of 5 and a comment of your choice.
7. Search products with keywords using a search bar
8. Add products to the cart, update quantity, and select size.
9. Various Payment checkout methods like COD, Stripe, and Razorpay(do not work because creating an account is hectic.).
10. Customized orders page where the user can see their orders or check the status. The track order feature is not available.
11. Personalized wishlist user. Users can add or remove items from the wishlist.
12. Light and Dark mode toggle using Tailwind CSS.

### Admin:
1. Add products and delete products from the database.
2. See and edit the order status of all the user orders placed.

### Security:
1. Email verification before registration.
2. Forgot password functionality implemented using nodemailer.

# Setup

### Pre-requisite
1. Latest version NodeJs installed
2. Mongodb running locally.

### Clone the project
    https://github.com/gautam899/ShopIt.git

### Go to the root directory.
cd e-commerce

### Install dependencies in frontend
    1 cd frontend
    2. npm install
### Install dependencies in the backend
    1 cd backend
    2. npm install
### Install dependencies in admin
    1 cd admin
    2. npm install

### Set up the environment in the frontend
    VITE_BACKEND_URL="Your_backend_URL"
    STRIPE_PUBLISHABLE_KEY="Your_Stripe_Key"
    VITE_RAZORPAY_KEY=""
    
### Set up the environment in the backend
    MONGODB_URI="YOUR_MONGO_URI"
    CLOUDINARY_API_KEY="YOUR_CLOUDINARY_API_KEY"
    CLOUDINARY_API_SECRET="YOUR_CLOUDINARY_SECRET_KEY"
    CLOUDINARY_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
    SECRET_KEY="YOUR_JWT_SECRET_KEY"
    ADMIN_EMAIL="EMAIL_OF_YOUR_CHOICE"
    ADMIN_PASSWORD="PASSWORD_OF_YOUR_CHOICE"
    EMAIL="YOUR_EMAIL_FOR_NODEMAILER"
    APP_PASSWORD_EMAIL="APP_PASSWORD_FOR_NODEMAILER"
    STRIPE_SECRET_KEY="STRIPE_SECRET_KEY"
    RAZORPAY_KEY=""
    RAZORPAY_SECRET_KEY=""
    FRONTEND_URL="FRONT_END_URL"
    EMAIL_VERIFICATION_SECRET="A_SECRET_KEY_OF_YOUR_CHOICE_FOR_EMAIL_VERIFICATION_DURING_REGISTRATION"

### Set up the environment in the frontend
    VITE_BACKEND_URL="Your_backend_URL"

## Run the project.
   
### Navigate to the backend directory.
    cd backend
    nodemon server.js
Make sure you have nodemon installed globally.

### Navigate to the frontend
    cd frontend
    npm run dev
### Navigate to the admin
    cd admin
    npm run dev
    
#### Frontend URL:  http://localhost:5173/
#### Backend_URL:  http://localhost:4000/

The URL's can be adjusted as per your preference.

# Bonus
### Don't forget to star the repo if you like it. 

# Author
[@bhavyagautam](https://github.com/gautam899)





