import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Flower Shop
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-primary-600">
              Products
            </Link>
            <Link to="/categories" className="text-gray-600 hover:text-primary-600">
              Categories
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600">
              About
            </Link>
          </div>

          {/* Cart and Auth */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 hover:text-primary-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              to="/login"
              className="text-gray-600 hover:text-primary-600"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product._id} className="flex space-x-4">
                        <img
                          src={item.product.mainImage}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.product.title}</h3>
                          <p className="text-primary-600">
                            ${item.product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              className="text-gray-500 hover:text-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Link
                      to="/checkout"
                      className="block w-full bg-primary-600 text-white text-center py-2 rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 