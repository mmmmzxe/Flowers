import React, { useState } from 'react';
import bgImg from '../assets/L.png';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LocationLoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/'); 
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bgImg})` }} className="h-screen w-full bg-cover flex justify-center items-center bg-center bg-no-repeat">
      <div className="z-20 flex flex-col items-center justify-center">
        <div className="bg-[#213F36] opacity-80 rounded-xl shadow-2xl px-8 py-10 flex flex-col items-center w-[340px] max-w-full mb-6">
          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col items-center w-[340px] max-w-full">
            <h3 className="text-white text-xl font-semibold mb-4">Login</h3>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button type="submit" className="bg-green-900 text-white font-semibold rounded-full px-6 py-2 shadow hover:bg-green-800 transition w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationLoginCard; 