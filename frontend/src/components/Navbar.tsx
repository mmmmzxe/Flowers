import React, { useState, useEffect } from 'react';
import Logo from '../assets/P.png';
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { PiUserLight } from "react-icons/pi";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/api';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
  const [isWishlistMenuOpen, setIsWishlistMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { favorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Menu and Links */}
          <div className="flex items-center space-x-8">
            {/* Menu Icon */}
            <button className="p-2">
              <RiMenu2Fill />
            </button>
            <a href="#" className="text-gray-700 text-sm font-normal hover:text-black">About Us</a>
            <a href="#" className="text-gray-700 text-sm font-normal hover:text-black">Catalog</a>
            <Link to="/" className="text-gray-700 text-sm font-normal hover:text-black">Contacts</Link>
          </div>
          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <img src={Logo} alt="Logo" />
          </div>
          {/* Right: Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Icon */}
            <button className="p-2">
              <CiSearch />
            </button>
            {/* Heart Icon */}
        
            {/* User Icon */}
            {user ? (
              <>
                <div className="relative">
                  <button 
                    className="p-2"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <CiUser />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user.name}</p>
                       
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button 
                    className="p-2"
                    onClick={() => setIsWishlistMenuOpen(!isWishlistMenuOpen)}
                  >
                    <CiHeart />
                  </button>
                </div>
                <div className="relative">
                  <button 
                    className="p-2"
                    onClick={() => setIsCartMenuOpen(!isCartMenuOpen)}
                  >
                    <CiShoppingCart />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="p-2"
              >
                <CiUser />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Wishlist Menu */}
      <div className={`fixed top-16 right-0 h-screen w-80 bg-white shadow-lg z-50 transform transition-all duration-500 ease-in-out ${isWishlistMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Wishlist</h2>
            <button 
              onClick={() => setIsWishlistMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="border-t pt-4">
            {favorites.length === 0 ? (
              <p className="text-gray-500">Your wishlist is empty</p>
            ) : (
              <>
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {favorites.map((product) => (
                    <div key={product._id} className="flex items-center gap-4">
                      <img 
                        src={product.mainImage} 
                        alt={product.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.price} Euro</p>
                      </div>
                      <button 
                        onClick={() => removeFromFavorites(product._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4">
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Add All to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cart Menu */}
      <div className={`fixed top-16 right-0 h-screen w-80 bg-white shadow-lg z-50 transform transition-all duration-500 ease-in-out ${isCartMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button 
              onClick={() => setIsCartMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="border-t pt-4">
            {items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product._id} className="flex items-center gap-4">
                      <img 
                        src={item.product.mainImage} 
                        alt={item.product.title} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.product.title}</h3>
                        <p className="text-sm text-gray-500">{item.product.price} Euro</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button 
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">{totalPrice} Euro</span>
                  </div>
                  <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-in-out ${(isCartMenuOpen || isWishlistMenuOpen) ? 'bg-opacity-50 z-40' : 'bg-opacity-0 -z-10'}`}
        onClick={() => {
          setIsCartMenuOpen(false);
          setIsWishlistMenuOpen(false);
        }}
      />
    </nav>
  );
};

export default Navbar; 