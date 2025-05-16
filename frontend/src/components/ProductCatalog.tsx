import React, { useState, useEffect } from 'react';
import { CiHeart, CiShoppingCart } from 'react-icons/ci';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { getProducts } from '../services/api';
import type { Product } from '../services/api';
import { Link } from 'react-router-dom';

const formatImageUrl = (url: string) => {
  if (!url) return '';
  // If the URL already contains 'i.postimg.cc', return it as is
  if (url.includes('i.postimg.cc')) {
    return url;
  }
  // Extract both the ID and filename from the URL
  const parts = url.split('/');
  const filename = parts.pop(); // Get the filename (e.g., "2.png")
  const id = parts.pop(); // Get the ID (e.g., "d3hCV4SZ")
  return `https://i.postimg.cc/${id}/${filename}`;
};

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(formatImageUrl(src));
  const [error, setError] = useState(false);

  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`);
    setError(true);
    // Fallback to a placeholder image
    setImgSrc('https://placehold.co/400x300?text=Flower+Image');
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className="object-contain hover:scale-105 transition-all duration-300 w-full h-72"
      onError={handleError}
    />
  );
};

export default function ProductCatalog() {
  const { addItem } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [showMessage, setShowMessage] = useState(false);
  const [messageProduct, setMessageProduct] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        console.log('API Response:', response.data.data); // Debug log
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setMessageProduct(product.title);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleFavoriteClick = (product: Product) => {
    if (isFavorite(product._id)) {
      removeFromFavorites(product._id);
    } else {
      addToFavorites(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      {/* Notification Message */}
      {showMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50">
          {messageProduct} added to cart!
        </div>
      )}

      <div className="flex w-full max-w-6xl gap-8 items-center">
        {/* Left column */}
        <div className="flex flex-col justify-between h-full" style={{ minWidth: 320, maxWidth: 340 }}>
          <div>
            {/* Top product */}
            <div className="mb-4">
              <div className="bg-white rounded-lg overflow-hidden flex flex-col gap-4 items-center justify-center">
                <ProductImage src={products[0]?.mainImage || ''} alt={products[0]?.title || ''} />
                <div className="px-2 pt-2 pb-1">
                  <div className="text-base font-normal mb-2 text-gray-900 leading-tight">{products[0]?.title}</div>
                  <div className="flex justify-between w-full items-center">
                    <h1 className='text-xs text-gray-500 mb-1'>{products[0]?.price} Euro</h1>
                    <div className="flex gap-2 text-gray-400 text-lg">
                      <CiHeart 
                        className={`cursor-pointer transition-colors ${isFavorite(products[0]?._id) ? 'text-red-500' : 'hover:text-red-500'}`}
                        onClick={() => handleFavoriteClick(products[0])}
                      />
                      <CiShoppingCart 
                        className="cursor-pointer hover:text-green-500 transition-colors"
                        onClick={() => handleAddToCart(products[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom product */}
            <div className="mb-4">
              <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center">
                <ProductImage src={products[1]?.mainImage || ''} alt={products[1]?.title || ''} />
                <div className="px-2 pt-2 pb-1">
                  <div className="text-base font-normal mb-2 text-gray-900 leading-tight">{products[1]?.title}</div>
                  <div className="flex justify-between w-full items-center">
                    <h1 className='text-xs text-gray-500 mb-1'>{products[1]?.price} Euro</h1>
                    <div className="flex gap-2 text-gray-400 text-lg">
                      <CiHeart 
                        className={`cursor-pointer transition-colors ${isFavorite(products[1]?._id) ? 'text-red-500' : 'hover:text-red-500'}`}
                        onClick={() => handleFavoriteClick(products[1])}
                      />
                      <CiShoppingCart 
                        className="cursor-pointer hover:text-green-500 transition-colors"
                        onClick={() => handleAddToCart(products[1])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button */}
          <button className="border border-gray-400 rounded bg-black text-white font-medium flex items-center gap-2 px-4 py-2 w-fit ml-2 mt-2 shadow-sm hover:bg-gray-100 hover:text-black transition">
            <span className="text-sm">Open More</span>
            <span className="ml-1 text-base">→</span>
          </button>
        </div>
        {/* Right column */}
        <div className="flex-1 flex flex-col justify-center h-full">
          <div className="flex flex-col justify-center h-full" style={{height: 520}}>
            {/* Heading */}
            <div className="text-4xl font-serif font-light text-gray-800 mb-6 leading-tight">
              Catalog of Floral Delights<br />for Every Occasion
            </div>
            {/* Product grid */}
            <div className="grid grid-cols-2 gap-6">
              {products.slice(2).map((product) => (
                <div key={product._id} className="bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center">
                  <Link to={`/products/${product._id}`} className="w-full">
                    <ProductImage src={product.mainImage} alt={product.title} />
                  </Link>
                  <div className="px-2 pt-2 w-[50%] pb-1">
                    <Link to={`/products/${product._id}`} className="text-base font-normal mb-2 text-gray-900 leading-tight hover:text-gray-600">
                      {product.title}
                    </Link>
                    <div className="flex justify-between w-full items-center">
                      <h1 className='text-xs text-gray-500 mb-1'>{product.price} Euro</h1>
                      <div className="flex gap-2 text-gray-400 text-lg">
                        <CiHeart 
                          className={`cursor-pointer transition-colors ${isFavorite(product._id) ? 'text-red-500' : 'hover:text-red-500'}`}
                          onClick={() => handleFavoriteClick(product)}
                        />
                        <CiShoppingCart 
                          className="cursor-pointer hover:text-green-500 transition-colors"
                          onClick={() => handleAddToCart(product)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 