import React, { useEffect, useState } from 'react';
import './Header.css';

import Tulips from '../assets/Header/6.png';
import Hydrangea from '../assets/Header/4.png';
import Pions from '../assets/Header/8.png';
import Roses from '../assets/Header/9.png';

import Daisies from '../assets/Header/10.png';
import Daffodils from '../assets/Header/11.png';
import Navbar from './Navbar';

const bouquets = [

Tulips,
Hydrangea,
Pions,
Roses,

Daisies,
Daffodils,
];

export default function Header() {
  const [frontIndex, setFrontIndex] = useState(0);

  // حساب مؤشرات الثلاث صور الظاهرة
  const getIndices = () => {
    const total = bouquets.length;
    const left = (frontIndex - 1 + total) % total;
    const right = (frontIndex + 1) % total;
    return { left, front: frontIndex, right };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFrontIndex((prev) => (prev + 1) % bouquets.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [frontIndex]);

  const { left, front, right } = getIndices();

  return (
    <div>
    
      <div className="header-bg py-10 px-4 flex justify-around h-screen items-center">
        <div className="flex flex-col items-start w-full max-w-lg pl-4">
          <h1 className="text-5xl md:text-6xl font-normal mb-8 leading-tight" style={{ fontFamily: 'KoPub Batang, serif' }}>
            Best house<br />plants varieties.
          </h1>
          <button className="bg-black text-white rounded-full px-8 py-3 text-lg font-medium mb-12 shadow hover:bg-gray-900 transition">Shop now</button>
          <div className="mb-6">
            <div className="text-lg font-semibold mb-2 text-black">Beautiful living greenery for<br />homes and offices</div>
            <div className="text-gray-500 text-sm">We've been mentioned in the press</div>
          </div>
          <div className="flex space-x-10 mt-2">
            <span className="text-2xl font-bold text-gray-400" style={{ fontFamily: 'serif' }}>Bloomberg</span>
            <span className="text-2xl font-bold text-gray-400" style={{ fontFamily: 'serif' }}>Forbes</span>
          </div>
        </div>
        <div className="bouquet-stage mt-8 flex justify-center items-center relative" style={{height:180, width:450}}>
          {bouquets.map((src, i) => {
            let className = 'hidden-bouquet';
            if (i === front) className = 'front-bouquet';
            else if (i === left) className = 'left-bouquet';
            else if (i === right) className = 'right-bouquet';
            return (
              <img
                key={src}
                src={src}
                alt={`Bouquet ${i + 1}`}
                className={`header-bouquet-img  ${className}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
} 