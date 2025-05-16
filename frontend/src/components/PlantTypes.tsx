import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import type { Category } from "../services/api";

interface CategoryWithCount extends Category {
  count: number;
}

const demoImages = [
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // Foliage
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Succulent
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80", // Flower
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80", // Fruit
];

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

const PlantTypes = () => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories and simulate plant counts for demo
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        // Simulate counts for demo; replace with real counts if available
        const demoCounts = [21, 4, 8, 10];
        const cats = res.data.data.slice(0, 4).map((cat, idx) => ({
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

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h2 className="text-4xl font-serif font-semibold text-[#395A47] mb-10">4 types of plants</h2>
      <div className="flex gap-8">
        {categories.map((cat, idx) => (
         <div className="flex flex-col">
          <div
            key={cat._id}
            className="relative rounded-2xl overflow-hidden shadow-lg w-[300px] h-48 flex-shrink-0"
            style={{
              backgroundImage: `url(${(cat.image || demoImages[idx])})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
       
          
         
           
          </div>
            <div className="text-2xl font-semibold drop-shadow-lg">{cat.title}</div>
            <div className="  text-lg font-medium drop-shadow-lg">{cat.count} PLANTS</div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PlantTypes;