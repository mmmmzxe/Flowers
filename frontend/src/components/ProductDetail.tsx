import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import api from '../services/api';
import type { Product } from '../services/api';

const formatImageUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('i.postimg.cc')) {
    return url;
  }
  const parts = url.split('/');
  const filename = parts.pop();
  const id = parts.pop();
  return `https://i.postimg.cc/${id}/${filename}`;
};

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(formatImageUrl(src));
  const [error, setError] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`);
    setError(true);
    setImgSrc('https://placehold.co/400x300?text=Flower+Image');
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className="object-contain hover:scale-105 transition-all duration-300 w-full h-96"
      onError={handleError}
    />
  );
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get<{ success: boolean; data: Product }>(`/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/'); // Redirect to home if product not found
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  const handleFavoriteClick = () => {
    if (product) {
      if (isFavorite(product._id)) {
        removeFromFavorites(product._id);
      } else {
        addToFavorites(product);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen py-10 px-4">
      {/* Notification Message */}
      {showMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50">
          {product.title} added to cart!
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <ProductImage src={product.mainImage} alt={product.title} />
            </div>
            {product.subImages && product.subImages.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.subImages.map((image, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden">
                    <ProductImage src={image} alt={`${product.title} - Image ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-light text-gray-800 mb-2">
                {product.title}
              </h1>
              <p className="text-2xl font-medium text-gray-900">
                {product.price} Euro
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>

              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite(product._id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <CiHeart size={24} />
              </button>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-medium mb-2">Product Details</h2>
              <ul className="space-y-2 text-gray-600">
                <li>Category: {typeof product.category === 'string' ? product.category : product.category.title}</li>
                <li>Stock: {product.stock} units</li>
                <li>Added: {new Date(product.createdAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 