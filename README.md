# Electrozone E-Commerce Platform

This e-commerce platform is a modern web application built with React and TypeScript, designed to provide a seamless shopping experience. Users can manage their profiles, add products to their basket or wishlist, checkout, track orders, and even cancel them if they are not older than one day.

## Technologies Used

- **Frontend**
  - **Framework:** Vite.js
  - **Programming Language:** TypeScript
  - **State Management:** Redux
  - **Routing:** react-router-dom
  - **Form Management:** react-hook-form
  - **Styling:** Tailwind CSS and Material UI

- **Backend**
  - The backend API is built with NestJS and is hosted separately. For details on the backend, please refer to the backend [repository](https://github.com/KutayAraz/electrozone-server).

- **Database**
  - **Type:** MySQL
  - **ORM:** TypeORM
  - **Authentication Middleware:** Passport
  - **Hosting:** Azure

## Features

- **User Management:** Users can create and update their profiles.
- **Product Interaction:** Users can add products to their basket and wishlist.
- **Order Management:** Users can checkout products, track their orders, and cancel them if they are not older than one day.
- **Trending Products:** Display trending products on the homepage, including best sellers, top rated items, and most wishlisted products.

## Installation

To get this project running on your local machine, follow these steps:

### Prerequisites

Before running the project, you must configure environment variables critical for both development and production environments:

1. **Create Environment Files:**
   - Create a `.env.development` file for development environment settings.
   - Create a `.env.production` file for production environment settings.

2. **Environment Variables:**
   - `VITE_API_URL`: Specify the base URL of your API.
   - `VITE_WEB3FORMS_ACCESS_KEY`: Provide the access key for Web3Forms if you're using it.

   Example `.env.development` content:
   ```plaintext
   VITE_API_URL=http://localhost:3000/api
   VITE_WEB3FORMS_ACCESS_KEY=your_development_access_key

Ensure you have npm installed:

```sh
npm install npm@latest -g
```

Setting Up the Project
Clone the repository:

```sh
git clone https://github.com/your_username_/Project-Name.git
```

Navigate to the project directory:

```sh
cd electrozone-client
```

Install required packages:

```sh
npm install
```

### Running the Project
After installation, you can start the project locally by running:

```sh
npm run dev
```

#### Additional Setup
Please note, this project requires a backend and a MySQL database to function properly. Ensure you have set up both and configured them according to the project requirements. Refer to the backend repository for setup instructions and details.

### Contact
Kutay Araz - kutayaraz7@gmail.com

Project Link: https://github.com/KutayAraz/electrozone-client
