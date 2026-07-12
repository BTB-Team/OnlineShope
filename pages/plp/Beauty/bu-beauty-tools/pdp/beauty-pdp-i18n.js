// ================= BEAUTY PDP I18N =================

// ================= LANGUAGE STATE =================

let currentLanguage = localStorage.getItem("language") || "en";

// ================= TRANSLATIONS =================

const translations = {
  en: {
    // PDP

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
  },

  fa: {
    // PDP

    home: "خانه",

    beauty: "زیبایی",

    product: "محصول",

    description: "توضیحات",

    specifications: "مشخصات",

    addToCart: "افزودن به سبد خرید",

    collection: "کالکشن",

    noSpecifications: "مشخصاتی موجود نیست",

    // CART

    yourCart: "سبد خرید شما",

    subtotal: "جمع کل",

    emptyCart: "سبد خرید شما خالی است",

    remove: "حذف",

    checkout: "تسویه حساب از طریق واتساپ",

    // TOAST

    addedToCart: "محصول به سبد خرید اضافه شد",
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
