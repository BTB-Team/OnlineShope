let currentLanguage = localStorage.getItem("language") || "en";

// ================= TRANSLATIONS =================
const translations = {
  en: {
    home: "Home",
    beauty: "Beauty",
    product: "Product",
    description: "Description",
    specifications: "Specifications",
    addToCart: "Add To Cart",
    collection: "Collection",
    noSpecifications: "No specifications available",

    // CART
    yourCart: "Your Cart",
    subtotal: "Subtotal",
    emptyCart: "Your cart is empty",
    remove: "Remove",
    checkout: "Checkout via WhatsApp",

    // TOAST
    addedToCart: "Product added to cart",

    beautyTools: "Beauty Tools",
products: "Products",
    women: "Women",
brushesApplicators: "Brushes & Applicators",
hairStylingTools: "Hair Styling Tools",
facialTools: "Facial Tools",
nailCareTools: "Nail Care Tools",
  },

  fa: {
    home: "خانه",
    beauty: "زیبایی",
    product: "محصول",
    description: "توضیحات",
    specifications: "مشخصات",
    addToCart: "افزودن به سبد خرید",
    collection: "کالکشن",
    noSpecifications: "مشخصاتی موجود نیست",

    yourCart: "سبد خرید شما",
    subtotal: "جمع کل",
    emptyCart: "سبد خرید شما خالی است",
    remove: "حذف",
    checkout: "تسویه حساب از طریق واتساپ",

    addedToCart: "محصول به سبد خرید اضافه شد",

    beautyTools: "ابزارهای زیبایی",
    products: "محصولات",
    women: "زنانه",
brushesApplicators: "براش و اپلیکاتورها",
hairStylingTools: "ابزارهای حالت‌دهی مو",
facialTools: "ابزارهای مراقبت از صورت",
nailCareTools: "ابزارهای مراقبت از ناخن",
  },
};

// ================= INITIALIZE =================
export function initializeLanguage() {
  currentLanguage = localStorage.getItem("language") || "en";
  applyDirection();
}

// ================= GET LANGUAGE =================
export function getLanguage() {
  return currentLanguage;
}

// ================= TOGGLE LANGUAGE =================
export function toggleLanguage() {
  const newLanguage = currentLanguage === "en" ? "fa" : "en";
  currentLanguage = newLanguage;
  localStorage.setItem("language", newLanguage);
}

// ================= TRANSLATE =================
export function translate(key) {
  return translations[currentLanguage]?.[key] || key;
}
// ================= RTL / LTR =================
function applyDirection() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";
}

// ================= PRODUCT TITLE =================
export function getProductTitle(product) {
  if (!product?.title) {
    return "";
  }
  if (typeof product.title === "object") {
    return product.title[currentLanguage] || product.title.en;
  }
  return product.title;
}

// ================= PRODUCT DESCRIPTION =================
export function getProductDescription(product) {
  if (!product?.description) {
    return "";
  }
  if (typeof product.description === "object") {
    return product.description[currentLanguage] || product.description.en;
  }
  return product.description;
}

// ================= PRICE =================
export function formatPrice(price) {
  if (currentLanguage === "fa") {
    return new Intl.NumberFormat("fa-IR").format(price) + " افغانی";
  }
  return Number(price).toFixed(2) + " AFN";
}
export function translateCategory(category) {
  const categoryMap = {
    "brushes-applicators": "brushesApplicators",
    "hair-styling-tools": "hairStylingTools",
    "facial-tools": "facialTools",
    "nail-care-tools": "nailCareTools",
  };

  const key = categoryMap[category];

  return key ? translate(key) : category;
}
