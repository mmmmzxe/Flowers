import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartResponse } from '../services/api';
import api from '../services/api';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  totalPrice: number;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get<CartResponse>('/cart');
        setItems(response.data.data.items);
        calculateTotal(response.data.data.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (localStorage.getItem('token')) {
      fetchCart();
    }
  }, []);

  const calculateTotal = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );
    setTotalPrice(total);
  };

  const addItem = async (product: Product, quantity: number) => {
    try {
      const response = await api.post<CartResponse>('/cart/items', { productId: product._id, quantity });
      setItems(response.data.data.items);
      calculateTotal(response.data.data.items);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const response = await api.delete<CartResponse>(`/cart/items/${productId}`);
      setItems(response.data.data.items);
      calculateTotal(response.data.data.items);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await api.put<CartResponse>(`/cart/items/${productId}`, { quantity });
      setItems(response.data.data.items);
      calculateTotal(response.data.data.items);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete<CartResponse>('/cart');
      setItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      totalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 