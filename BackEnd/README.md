# Flower Store Backend API

A complete e-commerce backend API for a flower store built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register, Login, JWT)
- Product Management
- Category Management
- Shopping Cart Functionality
- Admin Dashboard
- Protected Routes
- Input Validation
- Error Handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flower-store-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```

```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update item quantity
- `DELETE /api/cart/items/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Admin

- `GET /api/admin/users` - Get all users
- `GET /api/admin/carts` - Get all carts
- `GET /api/admin/stats` - Get system statistics
- `PUT /api/admin/users/:id/role` - Update user role

## Request/Response Examples

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

### Create Product
```http
POST /api/products
Content-Type: application/json
Authorization: Bearer <token>

{
    "title": "Rose Bouquet",
    "mainImage": "https://example.com/rose.jpg",
    "subImages": ["https://example.com/rose2.jpg"],
    "price": 49.99,
    "description": "Beautiful rose bouquet",
    "category": "category_id_here"
}
```

### Add to Cart
```http
POST /api/cart/items
Content-Type: application/json
Authorization: Bearer <token>

{
    "productId": "product_id_here",
    "quantity": 2
}
```

## Error Handling

The API uses a consistent error response format:

```json
{
    "success": false,
    "message": "Error message here"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer <token>
```

## Testing

Run tests using:
```bash
npm test
```

## License

MIT 