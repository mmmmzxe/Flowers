import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

// Types
export interface Product {
  _id: string;
  title: string;
  mainImage: string;
  subImages?: string[];
  price: number;
  description: string;
  category: string | { _id: string; title: string };
  stock: number;
  createdAt: string;
}

export interface Category {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Order {
  _id: string;
  user: Customer;
  items: {
    product: Product;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalCarts: number;
  activeCarts: number;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = () => api.get<{ success: boolean; data: Product[] }>('/products');
export const getProduct = (id: string) => api.get<{ success: boolean; data: Product }>(`/products/${id}`);
export const createProduct = (data: Omit<Product, '_id' | 'createdAt'>) => api.post<{ success: boolean; data: Product }>('/products', data);
export const updateProduct = (id: string, data: Partial<Omit<Product, '_id' | 'createdAt'>>) => api.put<{ success: boolean; data: Product }>(`/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete<{ success: boolean; data: {} }>(`/products/${id}`);

// Categories
export const getCategories = () => api.get<{ success: boolean; data: Category[] }>('/categories');
export const getCategory = (id: string) => api.get<{ success: boolean; data: Category }>(`/categories/${id}`);
export const createCategory = (data: Omit<Category, '_id' | 'createdAt'>) => api.post<{ success: boolean; data: Category }>('/categories', data);
export const updateCategory = (id: string, data: Partial<Omit<Category, '_id' | 'createdAt'>>) => api.put<{ success: boolean; data: Category }>(`/categories/${id}`, data);
export const deleteCategory = (id: string) => api.delete<{ success: boolean; data: {} }>(`/categories/${id}`);

// Customers
export const getCustomers = () => api.get<{ success: boolean; data: Customer[] }>('/admin/users');
export const getCustomer = (id: string) => api.get<{ success: boolean; data: Customer }>(`/admin/users/${id}`);
export const updateCustomerRole = (id: string, role: 'user' | 'admin') => api.put<{ success: boolean; data: Customer }>(`/admin/users/${id}/role`, { role });

// Orders
export const getOrders = () => api.get<{ success: boolean; data: Order[] }>('/admin/carts');
export const getOrder = (id: string) => api.get<{ success: boolean; data: Order }>(`/admin/carts/${id}`);

// Dashboard
export const getDashboardStats = () => api.get<{ success: boolean; data: DashboardStats }>('/admin/stats');

// Auth
export const login = (data: { email: string; password: string }) =>
  api.post<{ success: boolean; token: string }>('/auth/login', data);

export const register = (data: { name: string; email: string; password: string }) =>
  api.post<{ success: boolean; token: string }>('/auth/register', data);

export const getCurrentUser = () =>
  api.get<{ success: boolean; data: Customer }>('/auth/me');

// Add request interceptor for authentication
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 