import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import frame28 from '../assets/Products/Frame 28.png';
import frame29 from '../assets/Products/Frame 29.png';
import frame30 from '../assets/Products/Frame 30.png';
import image5_14 from '../assets/Products/2.png';
import image5_13 from '../assets/Products/3.png';
import image5_12 from '../assets/Products/4.png';
import image5_11 from '../assets/Products/5.png';
import image5_10 from '../assets/Products/6.png';
import image5_9 from '../assets/Products/image 5(9).png';
import image5_8 from '../assets/Products/image 5(8).png';
import image5_7 from '../assets/Products/image 5(7).png';
import image5_6 from '../assets/Products/image 5(6).png';
import image5_5 from '../assets/Products/image 5(5).png';

const plants = [
  {
    name: 'Frame 28',
    price: '$110.99',
    img: frame28,
  },
  {
    name: 'Frame 29',
    price: '$110.99',
    img: frame29,
  },
  {
    name: 'Frame 30',
    price: '$110.99',
    img: frame30,
  },
  {
    name: 'Image 5(14)',
    price: '$110.99',
    img: image5_14,
  },
  {
    name: 'Image 5(13)',
    price: '$110.99',
    img: image5_13,
  },
  {
    name: 'Image 5(12)',
    price: '$110.99',
    img: image5_12,
  },
  {
    name: 'Image 5(11)',
    price: '$110.99',
    img: image5_11,
  },
  {
    name: 'Image 5(10)',
    price: '$110.99',
    img: image5_10,
  },
  {
    name: 'Image 5(9)',
    price: '$110.99',
    img: image5_9,
  },
  {
    name: 'Image 5(8)',
    price: '$110.99',
    img: image5_8,
  },
  {
    name: 'Image 5(7)',
    price: '$110.99',
    img: image5_7,
  },
  {
    name: 'Image 5(6)',
    price: '$110.99',
    img: image5_6,
  },
  {
    name: 'Image 5(5)',
    price: '$110.99',
    img: image5_5,
  },
];

const BestSellerVarieties = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="w-full bg-white py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="uppercase text-xs tracking-widest text-gray-700 mb-2">Our Shop</div>
            <h2 className="text-3xl md:text-4xl font-serif font-normal mb-4 md:mb-0">Here are the best seller<br/>from our varieties</h2>
          </div>
          <button className="mt-4 md:mt-0 bg-black text-white rounded-full px-6 py-2 text-base font-medium shadow hover:bg-gray-900 transition">See all</button>
        </div>
        <div className="pb-10 overflow-x-hidden">
          <Slider {...settings} className="-mx-4">
            {plants.map((plant, idx) => (
              <div key={idx} className="px-8">
                <div className="min-w-[240px] max-w-xs flex-shrink-0 flex flex-col items-center bg-white transition-all duration-300">
                  <div className="w-full h-[400px]  overflow-hidden flex items-center justify-center mb-4">
                    <img src={plant.img} alt={plant.name} className="object-contain hover:scale-105 transition-all duration-300 w-full h-full" />
                  </div>
                  <div className="flex justify-between w-full px-1">
                    <span className="text-base text-black font-normal">{plant.name}</span>
                    <span className="text-base text-black font-normal">{plant.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BestSellerVarieties; 