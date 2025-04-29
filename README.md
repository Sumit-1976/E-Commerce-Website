# UrbanCart 🛒

**For checking the admin features, you can log in using the email `sumitcoder2004@gmail.com` and password `123456789`. After logging in, click on the profile icon to access the admin panel.**

> ⏳ On initial load, please note that it might take up to **1 minute** to render all products due to a large dataset being processed on the client side.

### 🌐 Live Site

👉 [urbancart-sigma.vercel.app](https://urbancart-sigma.vercel.app)

---

## 🧰 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** React Context API
- **Deployment:Frotend part is deployed in vercel and backend on render.

---

## ✅ Features

### 🧑‍💻 User Features
- User registration and login with email
- Upload profile picture
- Browse and search products
- Filter products by:
  - Category
  - Price: Low to High / High to Low
- Add products to cart
- View and update cart
- Proceed to checkout (UI flow complete)

### 🛠️ Admin Features
- Access admin panel via profile icon
- Add new products
- Edit existing product details (title, price, category, etc.)
- Update user roles (e.g., admin/user)

---

## 🔍 Search & Filters

- Fully functional search bar to find products by name
- Filter results by:
  - Price (min to max / max to min)
  - Category
- Dynamic product rendering after filtering

---

## 🏗️ Future Enhancements

- 💳 **Payment Integration** (Stripe or Razorpay)
- 📦 Order management system
- 🔔 Notifications and email confirmations
- 📈 Sales analytics dashboard for admin

---

## 🛠️ Getting Started Locally

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or Atlas)
- Create a `.env` file with the following:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret

