import { beautyProducts } from "./beauty-products-data.js";

import {
  initializeLanguage,
  getLanguage,
  toggleLanguage,
  translate,
  translateCount,
  getProductTitle,
  getProductDescription,
  formatPrice,
} from "./beauty-products-i18n.js";

// ================= DOM =================
const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const productsCount = document.getElementById("productsCount");
const emptyState = document.getElementById("emptyState");
const languageToggle = document.getElementById("languageToggle");
const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");
const toastContainer =
  document.getElementById("toastContainer");

// Breadcrumb
const breadcrumbHome = document.getElementById("breadcrumbHome");
const breadcrumbWomen = document.getElementById("breadcrumbWomen");
const breadcrumbBeautyTools = document.getElementById("breadcrumbBeautyTools");

// اگر در HTML اسم breadcrumbTitle باشد باز هم کار می‌کند
const breadcrumbProducts =
  document.getElementById("breadcrumbProducts") ||
  document.getElementById("breadcrumbTitle");

// Empty State
const emptyTitle = document.getElementById("emptyTitle");
const emptyDescription = document.getElementById("emptyDescription");

// Optional Texts
const homeText = document.getElementById("homeText");
const womenText = document.getElementById("womenText");
const beautyToolsText = document.getElementById("beautyToolsText");
const productsText = document.getElementById("productsText");

// ================= STATE =================
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");
let currentProducts = selectedCategory
  ? beautyProducts.filter((product) => product.category === selectedCategory)
  : [...beautyProducts];

// ================= INIT =================
function init() {
  initializeLanguage();
  updateStaticContent();
  renderProducts(currentProducts);
  bindEvents();
}

// ================= STATIC CONTENT =================
function updateStaticContent() {
  const language = getLanguage();
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  if (pageTitle) {
    pageTitle.textContent = translate("pageTitle");
  }
  if (pageDescription) {
    pageDescription.textContent = translate("pageDescription");
  }
  if (productSearch) {
    productSearch.placeholder = translate("searchPlaceholder");
  }
  if (emptyTitle) {
    emptyTitle.textContent = translate("emptyTitle");
  }
  if (emptyDescription) {
    emptyDescription.textContent = translate("emptyDescription");
  }
  if (languageToggle) {
    languageToggle.textContent = language === "en" ? "FA" : "EN";
  }

  // ========= Breadcrumb =========
  if (breadcrumbHome) {
    breadcrumbHome.textContent = translate("home");
  }
  if (breadcrumbWomen) {
    breadcrumbWomen.textContent = translate("women");
  }
  if (breadcrumbBeautyTools) {
    breadcrumbBeautyTools.textContent = translate("beautyTools");
  }
  if (breadcrumbProducts) {
    breadcrumbProducts.textContent = translate("products");
  }

  // ========= Optional Texts =========
  if (homeText) {
    homeText.textContent = translate("home");
  }
  if (womenText) {
    womenText.textContent = translate("women");
  }
  if (beautyToolsText) {
    beautyToolsText.textContent = translate("beautyTools");
  }
  if (productsText) {
    productsText.textContent = translate("products");
  }
}

// ================= RENDER =================
function renderProducts(products) {
  productGrid.innerHTML = "";
  if (productsCount) {
    productsCount.textContent = translateCount(products.length);
  }
  if (products.length === 0) {
    if (emptyState) {
      emptyState.classList.remove("hidden");
    }
    return;
  }
  if (emptyState) {
    emptyState.classList.add("hidden");
  }
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });
  productGrid.appendChild(fragment);
}

// ================= PRODUCT CARD =================
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.id = product.id;
  card.innerHTML = `
    <div class="product-card__media">
      <img class="product-card__image" src="${product.image}" alt="${getProductTitle(product)}" loading="lazy">
      ${
        product.badge
          ? `
            <span class="product-card__badge">
              ${product.badge}
            </span>
          `
          : ""
      }

      <button
  class="product-card__floating-cart btn btn-icon"
  type="button"
  data-action="cart"
  aria-label="Add to Cart">

  <svg
    height="24"
    width="24"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="#ffffff">

    <path
      fill="#ffffff"
      d="M456.169,230.305c-31.675-12.846-55.203-36.078-78.763-73.623
      c-27.405-43.677-29.413-80.099-41.628-104.848
      C322.908,25.733,293.11,0,256.13,0
      c-36.971,0-66.778,25.733-79.648,51.834
      c-12.214,24.749-14.231,68.025-34.774,110.833
      c-19.183,39.971-56.507,59.941-85.617,67.638
      c-25.396,6.73-17.854,28.864-17.854,28.864
      l22.338,161.51C67.814,473.028,112.557,512,165.399,512
      h181.463c52.842,0,97.584-38.972,104.832-91.322
      l22.33-161.51C474.024,259.169,480.516,240.182,456.169,230.305z
      M311.981,181.635c0,17.748-4.476,34.168-7.829,40.972
      c-7.672,15.543-25.97,22.264-48.022,22.264
      c-22.051,0-40.348-6.722-48.022-22.264
      c-3.344-6.804-7.829-23.224-7.829-40.972v-56.416
      c0-17.74,4.484-34.168,7.829-40.955
      c7.673-15.55,25.97-32.282,48.022-32.282
      c22.052,0,40.349,16.732,48.022,32.282
      c3.353,6.788,7.829,23.216,7.829,40.955V181.635z"/>
  </svg>

</button>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">
        ${getProductTitle(product)}
      </h3>
      <p class="product-card__description">
        ${getProductDescription(product)}
      </p>
      <div class="product-card__price">
        ${
          product.oldPrice
            ? `
              <span class="product-card__old-price number">
                ${formatPrice(product.oldPrice)}
              </span>`
            : ""
        }

        <span class="product-card__new-price number">
          ${formatPrice(product.price)}
        </span>
      </div>
      <div class="product-card__details">
        <a href="#" class="btn btn-ghost" data-action="details">
          ${
            getLanguage() === "fa"
              ? `${translate("viewDetails")} ←`
              : `${translate("viewDetails")} →`
          }
        </a>
      </div>
    </div>
  `;
  return card;
}

// ================= EVENTS =================
function bindEvents() {
  if (productSearch) {
    productSearch.addEventListener("input", handleSearch);
  }
  if (languageToggle) {
    languageToggle.addEventListener("click", handleLanguageChange);
  }
  if (productGrid) {
    productGrid.addEventListener("click", handleProductClick);
  }
}

// ================= SEARCH =================
function handleSearch(event) {
  const value = event.target.value.trim().toLowerCase();
  currentProducts = beautyProducts.filter((product) => {
    const titleEN = product.title?.en || "";
    const titleFA = product.title?.fa || "";
    const descriptionEN = product.description?.en || "";
    const descriptionFA = product.description?.fa || "";
    const searchableText = `
        ${titleEN}
        ${titleFA}
        ${descriptionEN}
        ${descriptionFA}
      `.toLowerCase();
    return searchableText.includes(value);
  });
  renderProducts(currentProducts);
}

// ================= LANGUAGE =================
function handleLanguageChange() {
  toggleLanguage();
  updateStaticContent();
  renderProducts(currentProducts);
}
// ================= CART =================

const CART_KEY = "beautyCart";

function addToCart(product) {
  let cart =
    JSON.parse(localStorage.getItem(CART_KEY)) || [];

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

  showToast(
    translate("addedToCart")
  );
}
// ================= TOAST =================
function showToast(message) {
  console.log("TOAST:", message);

  const toast = document.createElement("div");

  toast.className = "toast toast-success";
toast.style.position = "fixed";
toast.style.top = "24px";
toast.style.right = "24px";
toast.style.zIndex = "99999";
  toast.innerHTML = `
    <span class="toast__icon">✓</span>
    <span class="toast__message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}


// ================= PRODUCT CLICK =================
function handleProductClick(event) {
  const detailsButton = event.target.closest("[data-action='details']");
  const cartButton = event.target.closest("[data-action='cart']");
  // Add To Cart
  if (cartButton) {
    event.preventDefault();
    const card = cartButton.closest(".product-card");
    if (!card) return;
    const product = beautyProducts.find(
      (item) => String(item.id) === String(card.dataset.id),
    );

    if (!product) return;
    addToCart(product);
    return;
  }
  // View Details
  if (!detailsButton) {
    return;
  }
  event.preventDefault();
  const card = detailsButton.closest(".product-card");
  if (!card) {
    return;
  }
  const productId = card.dataset.id;
  const selectedProduct = beautyProducts.find(
    (product) => String(product.id) === String(productId),
  );
  if (!selectedProduct) {
    return;
  }
  localStorage.setItem(
    "selectedBeautyProduct",
    JSON.stringify(selectedProduct),
  );
  window.location.href = `./pdp/beauty-pdp.html?id=${selectedProduct.id}`;
}
init();
