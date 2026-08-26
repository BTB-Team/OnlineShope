import { bagShoesPdpData } from "./w-pdp-bag-shoes-data.js";
import {
  getProductTitle,
  getProductDescription,
  formatPrice,
  initializeLanguage,
  toggleLanguage,
  translate,
  getLanguage,
  getCategoryName,
} from "./w-pdp-bag-shoes-i18n.js";
import { bagShoesProducts } from "../plp-bag-shoes/w-plp-bag-shoes-data.js";

// ================= CONSTANT =================
const CART_KEY = "bagShoesCart";
// ================= PRODUCT =================
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const product = bagShoesProducts.find(
  (item) => String(item.id) === String(productId),
);
let productDetails = bagShoesPdpData[productId];
if (!product) {
  window.location.href = "../plp-bag-shoes/w-plp-bag-shoes.html";
  throw new Error("Product not found");
}

// Gallery
const mainImage = document.getElementById("mainImage");
const thumbnails = document.getElementById("thumbnails");

// Product Info
const productTitle = document.getElementById("productTitle");
const productSubtitle = document.getElementById("productSubtitle");
const productDescription = document.getElementById("productDescription");
const productCategory = document.getElementById("productCategory");
const currentPrice = document.getElementById("currentPrice");
const oldPrice = document.getElementById("oldPrice");

// Specifications
const descriptionTitle = document.getElementById("descriptionTitle");
// Breadcrumb
const homeText = document.getElementById("homeText");
const womenText = document.getElementById("womenText");
const bagShoesText = document.getElementById("bagShoesText");
const productsText = document.getElementById("productsText");
const breadcrumbTitle = document.getElementById("breadcrumbTitle");
const specificationsTitle = document.getElementById("specificationsTitle");

// Buttons
const addToCartBtn = document.getElementById("addToCartBtn");
const languageSwitcher = document.getElementById("languageSwitcher");

// ================= CART DOM =================
const toastContainer = document.getElementById("toastContainer");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const emptyCart = document.getElementById("emptyCart");
const cartTitle = document.getElementById("cartTitle");
const subtotalTitle = document.getElementById("subtotalTitle");
const cartCheckout = document.getElementById("cartCheckout");
// ================= GALLERY =================
function renderGallery() {
  if (!mainImage || !thumbnails) {
    return;
  }
  thumbnails.innerHTML = "";
  const images = productDetails?.images || [product.image];
  mainImage.src = images[0];
  images.forEach((image, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = image;
    thumbnail.alt = getProductTitle(product);
    thumbnail.className = "pdp-thumbnail";
    if (index === 0) {
      thumbnail.classList.add("active");
    }
    thumbnail.addEventListener("click", () => {
      mainImage.src = image;
      document.querySelectorAll(".pdp-thumbnail").forEach((item) => {
        item.classList.remove("active");
      });
      thumbnail.classList.add("active");
    });
    thumbnails.appendChild(thumbnail);
  });
}

// ================= PRODUCT INFO =================
function renderInfo() {
  if (productTitle) {
    productTitle.textContent = getProductTitle(product);
  }
  if (productSubtitle) {
    productSubtitle.textContent = getProductDescription(product);
  }
  if (productDescription) {
    productDescription.textContent = getProductDescription(product);
  }
  if (productCategory) {
    productCategory.textContent = getCategoryName(product.category);
  }
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = getProductTitle(product);
  }
  if (currentPrice) {
    currentPrice.textContent = formatPrice(product.price);
  }
  if (oldPrice) {
    oldPrice.textContent = product.oldPrice
      ? formatPrice(product.oldPrice)
      : "";
  }
}
// ================= STATIC TEXT =================
function renderStaticTexts() {
  // Breadcrumb
  if (homeText) {
    homeText.textContent = translate("home");
  }
  if (womenText) {
    womenText.textContent = translate("women");
  }
  if (bagShoesText) {
    bagShoesText.textContent = translate("bagShoes");
  }
  if (productsText) {
    productsText.textContent = translate("products");
  }
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = getProductTitle(product);
  }
  if (specificationsTitle) {
    specificationsTitle.textContent = translate("specifications");
  }
  // Buttons
  if (addToCartBtn) {
    addToCartBtn.textContent = translate("addToCart");
  }
  if (languageSwitcher) {
    languageSwitcher.textContent = getLanguage().toUpperCase();
  }
}
if (descriptionTitle) {
  descriptionTitle.textContent = translate("description");
}
if (cartTitle) {
  cartTitle.textContent = translate("yourCart");
}

if (subtotalTitle) {
  subtotalTitle.textContent = translate("subtotal");
}
if (cartCheckout) {
  cartCheckout.textContent = translate("checkout");
}

// ================= SPECIFICATIONS =================
function renderSpecifications() {
  if (!specificationsTable) return;

  specificationsTable.innerHTML = "";
  const specifications = productDetails?.specifications;
  if (!specifications) {
    specificationsTable.innerHTML = `
      <tr>
        <td colspan="2">
          ${translate("noSpecifications")}
        </td>
      </tr>`;
    return;
  }
  const language = getLanguage();
  const rows = [
    {
      label: translate("category"),
      value:
        specifications.category?.[language] ||
        specifications.category?.en ||
        "-",
    },
    {
      label: translate("gender"),
      value:
        specifications.gender?.[language] || specifications.gender?.en || "-",
    },
    {
      label: translate("color"),
      value: Array.isArray(specifications.color)
        ? specifications.color
            .map(
              (c) =>
                `<span class="color-dot" style="display:inline-block;width:20px;height:20px;border-radius:50%;background:${c};margin-right:5px;border:1px solid #ccc;"></span>`,
            )
            .join("")
        : "-",
    },
    {
      label: translate("sizes"),
      value: Array.isArray(specifications.sizes)
        ? specifications.sizes.join(", ")
        : "-",
    },
    {
      label: translate("material"),
      value:
        specifications.material?.[language] ||
        specifications.material?.en ||
        "-",
    },
  ];
  rows.forEach((item) => {
    if (!item || !item.label) return;
    const row = document.createElement("tr");
    const cellLabel = document.createElement("td");
    cellLabel.textContent = item.label;
    const cellValue = document.createElement("td");
    cellValue.innerHTML = item.value;
    row.appendChild(cellLabel);
    row.appendChild(cellValue);
    specificationsTable.appendChild(row);
  });
}
// ================= CART =================
function addToCart() {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const existingProduct = cart.find((item) => item.id === product.id);
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
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
  openCart();
  showToast(translate("addedToCart"));
}

// ================= CART DRAWER =================
function openCart() {
  if (cartDrawer) {
    cartDrawer.classList.add("active");
  }
  if (cartOverlay) {
    cartOverlay.classList.add("active");
  }
}
function closeCart() {
  if (cartDrawer) {
    cartDrawer.classList.remove("active");
  }
  if (cartOverlay) {
    cartOverlay.classList.remove("active");
  }
}
function renderCart() {
  if (!cartItems) {
    return;
  }
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    if (emptyCart) {
      emptyCart.style.display = "block";
    }
    if (cartSubtotal) {
      cartSubtotal.textContent = formatPrice(0);
    }
    return;
  }
  if (emptyCart) {
    emptyCart.style.display = "none";
  }
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
  <img class="cart-item__image" src="${item.image}" alt=""/>
  <div class="cart-item__content">
  <h3 class="cart-item__title"> ${item.title[getLanguage()] || item.title.en} </h3>
  <span class="cart-item__price"> ${formatPrice(item.price)} </span>
</div>
<div class="cart-item__actions">
  <div class="cart-qty">
    <button class="cart-minus" data-id="${item.id}"> - </button>
    <span class="cart-item__quantity"> ${item.quantity}</span>
    <button class="cart-plus" data-id="${item.id}"> + </button>
  </div>

  <button class="cart-remove" data-id="${item.id}"> ${translate("remove")} </button>
</div>
`;
    cartItems.appendChild(cartItem);
  });
  if (cartSubtotal) {
    cartSubtotal.textContent = formatPrice(total);
  }
}

// ================= UPDATE QUANTITY =================
function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const item = cart.find((product) => product.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((product) => product.id !== id);
    }
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

// ================= REMOVE =================
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
  showToast(translate("removedFromCart"));
}

// ================= TOAST =================
function showToast(message) {
  if (!toastContainer) {
    return;
  }
  const toast = document.createElement("div");
  toast.className = "toast toast-success";
  toast.innerHTML = `
    <span class="toast__icon"> ✓ </span>
    <span class="toast__message"> ${message}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ================= CART EVENTS =================
function handleCartActions(event) {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }
  const id = Number(button.dataset.id);
  if (button.classList.contains("cart-plus")) {
    updateQuantity(id, 1);
  }
  if (button.classList.contains("cart-minus")) {
    updateQuantity(id, -1);
  }
  if (button.classList.contains("cart-remove")) {
    removeFromCart(id);
  }
}

// ================= EVENTS =================
function bindEvents() {
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCart);
  }
  if (cartClose) {
    cartClose.addEventListener("click", closeCart);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }
  if (cartItems) {
    cartItems.addEventListener("click", handleCartActions);
  }
  if (languageSwitcher) {
    languageSwitcher.addEventListener("click", () => {
      toggleLanguage();
      location.reload();
    });
  }
}

// ================= INIT =================
function init() {
  initializeLanguage();
  renderStaticTexts();
  renderInfo();
  renderGallery();
  renderSpecifications();
  renderCart();
  bindEvents();
}
init();
