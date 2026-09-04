// primer-data.js
// Mock Data for Primer Collection
// This file contains ONLY data, no functions

export const primerProducts = [
  {
    id: 801,
    title: "Hydrating Primer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Primer",
    price: 950,
    oldPrice: 1250,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Moisturizing base for smooth makeup.",
    description: "Hydrating primer that creates a smooth, moisturized base for makeup application. Enriched with hyaluronic acid and vitamins to nourish skin. Perfect for dry and normal skin types.",
    specifications: {
      category: "Makeup",
      subcategory: "Primer",
      type: "Hydrating Primer",
      finish: "Dewy",
      skinType: [
        { name: "Dry", color: "#FFF3E0" },
        { name: "Normal", color: "#E3F2FD" },
        { name: "Combination", color: "#FFF9C4" }
      ]
    },
    stock: 30,
    featured: true
  },
  {
    id: 802,
    title: "Mattifying Primer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Primer",
    price: 920,
    oldPrice: 1200,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Controls oil and shine.",
    description: "Mattifying primer that controls oil and minimizes shine. Creates a smooth, matte base for long-lasting makeup. Ideal for oily and combination skin types.",
    specifications: {
      category: "Makeup",
      subcategory: "Primer",
      type: "Mattifying Primer",
      finish: "Matte",
      skinType: [
        { name: "Oily", color: "#E0F7FA" },
        { name: "Combination", color: "#FFF9C4" },
        { name: "Acne-Prone", color: "#FFEBEE" }
      ]
    },
    stock: 28,
    featured: false
  },
  {
    id: 803,
    title: "Pore Minimizing Primer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Primer",
    price: 980,
    oldPrice: 1300,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Blurs pores for smooth skin.",
    description: "Pore minimizing primer that blurs the appearance of pores and fine lines. Creates a smooth, even canvas for makeup. Lightweight, silky texture.",
    specifications: {
      category: "Makeup",
      subcategory: "Primer",
      type: "Pore Minimizing Primer",
      finish: "Smooth",
      skinType: [
        { name: "All Types", color: "#E8F5E9" },
        { name: "Oily", color: "#E0F7FA" },
        { name: "Combination", color: "#FFF9C4" }
      ]
    },
    stock: 25,
    featured: true
  },
  {
    id: 804,
    title: "Illuminating Primer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Primer",
    price: 1050,
    oldPrice: 1400,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Adds radiant glow to skin.",
    description: "Illuminating primer that adds a subtle, radiant glow to skin. Light-reflecting particles create a luminous base. Perfect for dull or tired-looking skin.",
    specifications: {
      category: "Makeup",
      subcategory: "Primer",
      type: "Illuminating Primer",
      finish: "Radiant",
      skinType: [
        { name: "Dry", color: "#FFF3E0" },
        { name: "Normal", color: "#E3F2FD" },
        { name: "Mature", color: "#F3E5F5" }
      ]
    },
    stock: 22,
    featured: false
  },
  {
    id: 805,
    title: "Color Correcting Primer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Primer",
    price: 1020,
    oldPrice: 1350,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Neutralizes skin discoloration.",
    description: "Color correcting primer that neutralizes redness, dark spots, and uneven skin tone. Available in multiple shades to address different concerns. Creates an even base for foundation.",
    specifications: {
      category: "Makeup",
      subcategory: "Primer",
      type: "Color Correcting Primer",
      finish: "Natural",
      skinType: [
        { name: "All Types", color: "#E8F5E9" }
      ]
    },
    stock: 20,
    featured: false
  },
  {
    id: 806,
    title: "Long-Wear Primer",
    category: "Beauty",
    subCategory: "Makeup",
    collection: "Primer",
    price: 1100,
    oldPrice: 1450,
    badge: "SALE",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=600&fit=crop&q=80"
    ],
    video: "",
    shortDescription: "Extends makeup wear time.",
    description: "Long-wear primer that extends makeup longevity for all-day wear. Grips makeup to prevent fading, creasing, and melting. Suitable for all skin types and climates.",
    specifications: {
      category: "Makeup",
      subcategory: "Primer",
      type: "Long-Wear Primer",
      finish: "Natural",
      skinType: [
        { name: "All Types", color: "#E8F5E9" }
      ]
    },
    stock: 18,
    featured: true
  }
];