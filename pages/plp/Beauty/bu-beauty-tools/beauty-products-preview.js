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

// Breadcrumb
const breadcrumbHome = document.getElementById("breadcrumbHome");
const breadcrumbWomen = document.getElementById("breadcrumbWomen");
const breadcrumbBeautyTools = document.getElementById(
  "breadcrumbBeautyTools",
);

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
  ? beautyProducts.filter(
      (product) => product.category === selectedCategory,
    )
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
  document.documentElement.dir =
    language === "fa" ? "rtl" : "ltr";

  if (pageTitle) {
    pageTitle.textContent = translate("pageTitle");
  }

  if (pageDescription) {
    pageDescription.textContent =
      translate("pageDescription");
  }

  if (productSearch) {
    productSearch.placeholder =
      translate("searchPlaceholder");
  }

  if (emptyTitle) {
    emptyTitle.textContent =
      translate("emptyTitle");
  }

  if (emptyDescription) {
    emptyDescription.textContent =
      translate("emptyDescription");
  }

  if (languageToggle) {
    languageToggle.textContent =
      language === "en" ? "FA" : "EN";
  }

  // ========= Breadcrumb =========

  if (breadcrumbHome) {
    breadcrumbHome.textContent =
      translate("home");
  }

  if (breadcrumbWomen) {
    breadcrumbWomen.textContent =
      translate("women");
  }

  if (breadcrumbBeautyTools) {
    breadcrumbBeautyTools.textContent =
      translate("beautyTools");
  }

  if (breadcrumbProducts) {
    breadcrumbProducts.textContent =
      translate("products");
  }

  // ========= Optional Texts =========

  if (homeText) {
    homeText.textContent =
      translate("home");
  }

  if (womenText) {
    womenText.textContent =
      translate("women");
  }

  if (beautyToolsText) {
    beautyToolsText.textContent =
      translate("beautyTools");
  }

  if (productsText) {
    productsText.textContent =
      translate("products");
  }
}

// ================= RENDER =================

function renderProducts(products) {
  productGrid.innerHTML = "";

  if (productsCount) {
    productsCount.textContent =
      translateCount(products.length);
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

  const fragment =
    document.createDocumentFragment();

  products.forEach((product) => {
    fragment.appendChild(
      createProductCard(product),
    );
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

      <img
        class="product-card__image"
        src="${product.image}"
        alt="${getProductTitle(product)}"
        loading="lazy">

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
        class="product-card__floating-cart icon-button"
        type="button"
        data-action="cart"
        aria-label="Add to cart">

        🛒

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
              </span>
            `
            : ""
        }

        <span class="product-card__new-price number">
          ${formatPrice(product.price)}
        </span>

      </div>

      <div class="product-card__details">

        <a
          href="#"
          class="btn btn-ghost"
          data-action="details">

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
    languageToggle.addEventListener(
      "click",
      handleLanguageChange,
    );
  }

  if (productGrid) {
    productGrid.addEventListener(
      "click",
      handleProductClick,
    );
  }
}

// ================= SEARCH =================

function handleSearch(event) {
  const value = event.target.value
    .trim()
    .toLowerCase();

  currentProducts = beautyProducts.filter(
    (product) => {
      const titleEN =
        product.title?.en || "";

      const titleFA =
        product.title?.fa || "";

      const descriptionEN =
        product.description?.en || "";

      const descriptionFA =
        product.description?.fa || "";

      const searchableText = `
        ${titleEN}
        ${titleFA}
        ${descriptionEN}
        ${descriptionFA}
      `.toLowerCase();

      return searchableText.includes(value);
    },
  );

  renderProducts(currentProducts);
}

// ================= LANGUAGE =================

function handleLanguageChange() {
  toggleLanguage();

  updateStaticContent();

  renderProducts(currentProducts);
}

// ================= PRODUCT CLICK =================

function handleProductClick(event) {
  const detailsButton =
    event.target.closest(
      "[data-action='details']",
    );

  const cartButton =
    event.target.closest(
      "[data-action='cart']",
    );

  // Add To Cart
  if (cartButton) {
    event.preventDefault();

    const card =
      cartButton.closest(".product-card");

    if (!card) return;

    const product =
      beautyProducts.find(
        (item) =>
          String(item.id) ===
          String(card.dataset.id),
      );

    if (!product) return;

    // اینجا بعداً مودال یا سبد خرید را اضافه می‌کنیم
    console.log(
      "Add To Cart:",
      product,
    );

    return;
  }

  // View Details
  if (!detailsButton) {
    return;
  }

  event.preventDefault();

  const card =
    detailsButton.closest(
      ".product-card",
    );

  if (!card) {
    return;
  }

  const productId =
    card.dataset.id;

  const selectedProduct =
    beautyProducts.find(
      (product) =>
        String(product.id) ===
        String(productId),
    );

  if (!selectedProduct) {
    return;
  }

  localStorage.setItem(
    "selectedBeautyProduct",
    JSON.stringify(
      selectedProduct,
    ),
  );

  window.location.href =
    `./pdp/beauty-pdp.html?id=${selectedProduct.id}`;
}

// ================= START =================

init();