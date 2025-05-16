const plantCategories = [
  {
    title: "Indoor Plants",
    description: "Beautiful plants that thrive indoors",
    image: "https://i.postimg.cc/8zLJ8ZQK/indoor-plants.jpg"
  },
  {
    title: "Outdoor Plants",
    description: "Perfect plants for your garden and outdoor spaces",
    image: "https://i.postimg.cc/8zLJ8ZQK/outdoor-plants.jpg"
  },
  {
    title: "Flowering Plants",
    description: "Colorful and fragrant flowering plants",
    image: "https://i.postimg.cc/8zLJ8ZQK/flowering-plants.jpg"
  },
  {
    title: "Succulents",
    description: "Low-maintenance plants perfect for any space",
    image: "https://i.postimg.cc/8zLJ8ZQK/succulents.jpg"
  },
  {
    title: "Herbs",
    description: "Fresh herbs for cooking and decoration",
    image: "https://i.postimg.cc/8zLJ8ZQK/herbs.jpg"
  }
];

const plantProducts = [
  // Indoor Plants
  {
    title: "Monstera Deliciosa",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/monstera.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/monstera-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/monstera-2.jpg"
    ],
    price: 49.99,
    description: "Large, glossy leaves with distinctive splits and holes. Perfect for adding a tropical touch to your home.",
    category: "Indoor Plants",
    stock: 15
  },
  {
    title: "Snake Plant",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/snake-plant.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/snake-plant-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/snake-plant-2.jpg"
    ],
    price: 29.99,
    description: "Tall, upright leaves with yellow edges. Known for its air-purifying qualities.",
    category: "Indoor Plants",
    stock: 20
  },

  // Outdoor Plants
  {
    title: "Hydrangea Bush",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/hydrangea.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/hydrangea-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/hydrangea-2.jpg"
    ],
    price: 39.99,
    description: "Beautiful flowering shrub with large, colorful blooms. Perfect for garden borders.",
    category: "Outdoor Plants",
    stock: 10
  },
  {
    title: "Japanese Maple",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/japanese-maple.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/japanese-maple-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/japanese-maple-2.jpg"
    ],
    price: 89.99,
    description: "Elegant tree with delicate, colorful foliage. Adds beauty to any landscape.",
    category: "Outdoor Plants",
    stock: 8
  },

  // Flowering Plants
  {
    title: "Orchid Phalaenopsis",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/orchid.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/orchid-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/orchid-2.jpg"
    ],
    price: 34.99,
    description: "Elegant flowering plant with long-lasting blooms. Perfect for indoor decoration.",
    category: "Flowering Plants",
    stock: 25
  },
  {
    title: "Peace Lily",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/peace-lily.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/peace-lily-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/peace-lily-2.jpg"
    ],
    price: 24.99,
    description: "Beautiful plant with white flowers and glossy leaves. Great for air purification.",
    category: "Flowering Plants",
    stock: 18
  },

  // Succulents
  {
    title: "Echeveria Collection",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/echeveria.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/echeveria-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/echeveria-2.jpg"
    ],
    price: 19.99,
    description: "Set of 3 different Echeveria varieties. Perfect for windowsills and small spaces.",
    category: "Succulents",
    stock: 30
  },
  {
    title: "Aloe Vera",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/aloe-vera.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/aloe-vera-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/aloe-vera-2.jpg"
    ],
    price: 14.99,
    description: "Medicinal plant with soothing gel. Easy to care for and useful for skin care.",
    category: "Succulents",
    stock: 22
  },

  // Herbs
  {
    title: "Basil Plant",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/basil.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/basil-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/basil-2.jpg"
    ],
    price: 9.99,
    description: "Fresh basil plant perfect for cooking. Grows well indoors or outdoors.",
    category: "Herbs",
    stock: 40
  },
  {
    title: "Mint Plant",
    mainImage: "https://i.postimg.cc/8zLJ8ZQK/mint.jpg",
    subImages: [
      "https://i.postimg.cc/8zLJ8ZQK/mint-1.jpg",
      "https://i.postimg.cc/8zLJ8ZQK/mint-2.jpg"
    ],
    price: 8.99,
    description: "Refreshing mint plant. Great for teas, cocktails, and cooking.",
    category: "Herbs",
    stock: 35
  }
];

module.exports = {
  plantCategories,
  plantProducts
}; 