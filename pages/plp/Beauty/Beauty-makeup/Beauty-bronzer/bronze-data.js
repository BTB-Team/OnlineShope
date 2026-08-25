// bronze-data.js
// Mock Data for Bronze Collection
// This file contains ONLY data, no functions

export const bronzeProducts = [
  {
    id: 901,
    title: "Matte Bronzer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Bronze",
    price: 850,
    oldPrice: 1150,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Natural sun-kissed look for contouring.",
    description: "Matte bronzer for a natural, sun-kissed look. Perfect for contouring and adding warmth to the complexion. Long-lasting formula that blends seamlessly into the skin.",
    specifications: {
      category: "Makeup",
      subcategory: "Bronze",
      type: "Powder",
      finish: "Matte",
      shades: [
        { name: "Light Bronze", color: "#C19A6B" },
        { name: "Medium Bronze", color: "#B87333" },
        { name: "Deep Bronze", color: "#8B4513" }
      ]
    },
    stock: 20,
    featured: true
  },
  {
    id: 902,
    title: "Shimmer Bronzer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Bronze",
    price: 920,
    oldPrice: 1200,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Luminous glow with shimmer finish.",
    description: "Shimmer bronzer that adds a luminous glow to your skin. Perfect for highlighting and adding dimension. Creates a radiant, sun-kissed effect.",
    specifications: {
      category: "Makeup",
      subcategory: "Bronze",
      type: "Powder",
      finish: "Shimmer",
      shades: [
        { name: "Golden Bronze", color: "#CD7F32" },
        { name: "Rose Bronze", color: "#B76E79" },
        { name: "Copper Bronze", color: "#B87333" }
      ]
    },
    stock: 18,
    featured: false
  },
  {
    id: 903,
    title: "Bronzing Powder",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Bronze",
    price: 780,
    oldPrice: 1050,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Finely milled for smooth finish.",
    description: "Finely milled bronzing powder for a smooth, natural finish. Buildable coverage that looks natural on all skin tones.",
    specifications: {
      category: "Makeup",
      subcategory: "Bronze",
      type: "Powder",
      finish: "Natural",
      shades: [
        { name: "Warm Bronze", color: "#C68642" },
        { name: "Neutral Bronze", color: "#B87333" },
        { name: "Cool Bronze", color: "#A0826D" }
      ]
    },
    stock: 25,
    featured: false
  },
  {
    id: 904,
    title: "Bronzing Balm",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Bronze",
    price: 950,
    oldPrice: 1250,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Blends easily for soft glow.",
    description: "Bronzing balm that blends easily for a soft glow. Creamy texture melts into skin for a natural, healthy-looking tan.",
    specifications: {
      category: "Makeup",
      subcategory: "Bronze",
      type: "Balm",
      finish: "Natural",
      shades: [
        { name: "Sun-Kissed", color: "#D2691E" },
        { name: "Honey Bronze", color: "#CD853F" }
      ]
    },
    stock: 15,
    featured: false
  },
  {
    id: 905,
    title: "Bronzing Cream",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Bronze",
    price: 1020,
    oldPrice: 1350,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Radiant, buildable glow.",
    description: "Bronzing cream for a radiant, buildable glow. Lightweight formula that layers beautifully for customizable warmth.",
    specifications: {
      category: "Makeup",
      subcategory: "Bronze",
      type: "Cream",
      finish: "Radiant",
      shades: [
        { name: "Soft Bronze", color: "#C19A6B" },
        { name: "Rich Bronze", color: "#8B4513" },
        { name: "Amber Bronze", color: "#D2691E" }
      ]
    },
    stock: 22,
    featured: true
  },
  {
    id: 906,
    title: "Mousse Bronzer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Bronze",
    price: 1080,
    oldPrice: 1450,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Airy mousse for soft finish.",
    description: "Airy mousse bronzer for a soft, blendable finish. Whipped texture provides effortless application and natural-looking color.",
    specifications: {
      category: "Makeup",
      subcategory: "Bronze",
      type: "Mousse",
      finish: "Natural",
      shades: [
        { name: "Caramel", color: "#C68642" },
        { name: "Toffee", color: "#A0826D" }
      ]
    },
    stock: 12,
    featured: false
  }
];