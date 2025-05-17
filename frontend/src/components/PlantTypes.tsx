import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import type { Category } from "../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CategoryWithCount extends Category {
  count: number;
}

const demoImages = [
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // Foliage
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Succulent
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80", // Flower
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80", // Fruit
];

const PlantTypes = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        const demoCounts = [21, 4, 8, 10 , 50 , 70];
        const cats = res.data.data.map((cat, idx) => ({
          ...cat,
          count: demoCounts[idx] || 0,
        }));
        setCategories(cats);
      } catch (err) {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-4xl font-serif font-semibold text-[#395A47] mb-10">4 types of plants</h2>
      <div className="w-full max-w-7xl">
        <Slider {...sliderSettings}>
          {categories.map((cat, idx) => (
            <div key={cat._id} className="flex flex-col items-center px-2">
              <div
                className="relative overflow-hidden h-48 flex-shrink-0"
                style={{
                  backgroundImage: `url(${cat.image || demoImages[idx]})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
              </div>
              <div className="text-md font-semibold drop-shadow-lg mt-4">{cat.title}</div>
              <div className="text-sm font-medium drop-shadow-lg">{cat.count} PLANTS</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PlantTypes;