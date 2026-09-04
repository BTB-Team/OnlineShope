/* ==========================================================
   IMPORTS
========================================================== */
import { lipTintProducts } from "./Bu-li-lt-data.js";
import translations from "./Bu-li-lt-i18n.js";

/* ==========================================================
   CONSTANTS
========================================================== */
const DEFAULT_LANGUAGE = "en";
const SKELETON_DELAY = 1200;
const LANGUAGE_STORAGE_KEY = "selectedLanguage";
const PRODUCT_TITLE_KEYS = {
    "bu-li-lt-001": "waterLipTint",
    "bu-li-lt-002": "gelLipTint",
    "bu-li-lt-003": "creamLipTint",
    "bu-li-lt-004": "velvetLipTint",
    "bu-li-lt-005": "glossyLipTint",
    "bu-li-lt-006": "matteLipTint",
    "bu-li-lt-007": "nudeLipTint",
    "bu-li-lt-008": "lipCheekTint"
};

/* ==========================================================
   GET SAVED LANGUAGE
========================================================== */
function getCurrentLanguage() {
    return (
        localStorage.getItem(
            LANGUAGE_STORAGE_KEY
        ) ||
        DEFAULT_LANGUAGE
    );

}

/* ==========================================================
   APPLICATION STATE
========================================================== */
let currentLanguage = getCurrentLanguage();
let productList = lipTintProducts;

/* ==========================================================
   CALCULATE TOTAL PRODUCTS
========================================================== */
function getTotalProducts(products) {
    return products.length;
}

/* ==========================================================
   CART SYSTEM STATE
========================================================== */
let cartItems = JSON.parse(
    localStorage.getItem("lipTintCart")
) || [];

/* ==========================================================
   CART Skeleton CSS INJECTION
   Cart Skeleton has no separate CSS file
   Styles are created by JavaScript
========================================================== */
function injectCartSkeletonStyles() {
    if (document.getElementById("cart-skeleton-style")) {
        return;
    }
    const style = document.createElement("style");
    style.id = "cart-skeleton-style";
    style.textContent = `
    /* ============   CART SKELETON ============ */
        .cart-skeleton {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--space-5); 
        }
        /* ============   ITEM============ */
        .cart-skeleton__item {
          display: flex;
          gap: var(--space-3);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-border); 
        }
        /* ============   RTL SUPPORT============ */
        // [dir="rtl"] .cart-skeleton__item {
        //   flex-direction: row-reverse; 
        // }

        [dir="ltr"] .cart-skeleton__item {
          flex-direction: row; 
        }
        /* ============   IMAGE============ */
        .cart-skeleton__image {
          width: var(--thumbnail-width);
          height: var(--thumbnail-height);
          flex-shrink: 0;
          border-radius: var(--radius-md); 
        }
        /* ============   CONTENT============ */
        .cart-skeleton__content {
          flex: 1; 
        }
        .cart-skeleton__category {
          width: 30%;
          height: var(--space-3);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-2); 
        }
        .cart-skeleton__title {
          width: 75%;
          height: var(--space-5);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-3); 
        }
        .cart-skeleton__price {
          width: 25%;
          height: var(--space-4);
          border-radius: var(--radius-sm); 
        }
        /* ============   SUMMARY============ */
        .cart-skeleton__summary {
          padding-top: var(--space-4); 
        }
        .cart-skeleton__subtotal {
          width: 40%;
          height: var(--space-5);
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-4); 
        }
        .cart-skeleton__button {
          width: 100%;
          height: var(--button-height);
          border-radius: var(--radius-md); 
        }
        /* ============   MOBILE============ */
        @media(max-width:768px) {
          .cart-skeleton__image {
            width: 72px;
            height: 90px; 
          }
          .cart-skeleton__title {
            width: 90%; 
          }
          .cart-skeleton__price {
            width: 35%; 
          }
          .cart-skeleton__subtotal {
            width: 60%; 
          }  
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================================
   CREATE CART LOADING SKELETON
   Created only with JavaScript
========================================================== */
function createCartSkeleton() {
    if (!cartElements.body) {
        return;
    }
    const template =
        document.getElementById(
            "shopping-cart-skeleton"
        );
    if (!template) {
        return;
    }
    cartElements.body.innerHTML = "";
    const skeleton =
        template.content.cloneNode(true);
    cartElements.body.appendChild(
        skeleton
    );
}

/* ==========================================================
   CART ELEMENTS
========================================================== */
const cartElements = {
    drawer: null,
    overlay: null,
    closeButton: null,
    body: null,
    footer: null,
    total: null
};

/* ==========================================================
   CREATE CART DRAWER HTML
   Entire cart is generated by JavaScript
   Text comes from i18n.js
========================================================== */
function createCartDrawer() {
    if (document.querySelector(".cart-drawer")) {
        return;
    }
    const languageData = getLanguageData();
    const cartWrapper = document.createElement("div");
    cartWrapper.innerHTML = `
    <div class="cart-overlay"></div>
    <aside class="cart-drawer">
        <div class="cart-header">
            <h2 class="cart-title">
                ${languageData.cartTitle}
            </h2>
            <button class="cart-close" aria-label="${languageData.cartTitle}">
                ✕
            </button>
        </div>
        <div class="cart-body"></div>
        <div class="cart-footer">
            <div class="cart-total">
                <span class="number">
                    ${languageData.subtotal}
                </span>
                <strong class="cart-total-price number">
                    ${formatCartPrice(0)}
                </strong>
            </div>
            <button class="cart-checkout">
                ${languageData.checkoutWhatsapp}
            </button>
        </div>
    </aside>
    `;
    document.body.appendChild(cartWrapper);
    const drawer = cartWrapper.querySelector(".cart-drawer");
    const overlay = cartWrapper.querySelector(".cart-overlay");
    drawer.style.display = "none";
    overlay.style.display = "none";
}

/* ==========================================================
   GET CART ELEMENTS
========================================================== */
function getCartElements() {
    cartElements.drawer =
        document.querySelector(".cart-drawer");
    cartElements.overlay =
        document.querySelector(".cart-overlay");
    cartElements.closeButton =
        document.querySelector(".cart-close");
    cartElements.body =
        document.querySelector(".cart-body");

    /* ==========================================================
    CART FOOTER
    ========================================================== */
    cartElements.footer =
        document.querySelector(".cart-footer");
    cartElements.total =
        document.querySelector(".cart-total-price");
}

/* ==========================================================
   SAVE CART
========================================================== */
function saveCart() {
    localStorage.setItem(
        "lipTintCart",
        JSON.stringify(cartItems)
    );
}

/* ==========================================================
   CART VISIBILITY
   Show and hide cart using JavaScript
========================================================== */
function showCart() {
    if (!cartElements.drawer || !cartElements.overlay) {
        return;
    }
    cartElements.drawer.style.display = "flex";
    cartElements.overlay.style.display = "block";
}
function hideCart() {
    if (!cartElements.drawer || !cartElements.overlay) {
        return;
    }
    cartElements.drawer.style.display = "none";
    cartElements.overlay.style.display = "none";
}

/* ==========================================================
   OPEN CART
========================================================== */
function openCart() {
    showCart();
    loadCartSkeleton();
}

/* ==========================================================
   CLOSE CART
========================================================== */
function closeCart() {
    hideCart();
}

/* ==========================================================
   CREATE CART LOADING EFFECT
========================================================== */
function loadCartSkeleton() {
    /* Hide footer while skeleton is loading */
    cartElements.footer.style.display = "none";
    createCartSkeleton();
    setTimeout(() => {
        /* Show footer after loading */
        cartElements.footer.style.display = "block";
        renderCart();
    }, SKELETON_DELAY);
}

/* ==========================================================
   FORMAT CART PRICE
========================================================== */
function formatCartPrice(price) {
    return currentLanguage === "fa"
        ? `${price} افغانی`
        : `${price} AFN`;
}

/* ==========================================================
   CALCULATE CART TOTAL
========================================================== */
function calculateCartTotal() {
    return cartItems.reduce(
        (total, item) => {
            return total +
                (item.price * item.quantity);
        },
        0
    );
}

/* ==========================================================
   RENDER CART ITEMS
========================================================== */
function renderCart() {
    if (!cartElements.body) {
        return;
    }
    const languageData = getLanguageData();
    if (cartItems.length === 0) {
        cartElements.body.innerHTML = `
            <p class="cart-empty">
                ${languageData.emptyCart}
            </p>
        `;
        updateCartTotal();
        return;
    }
    cartElements.body.innerHTML = "";
    cartItems.forEach(item => {
        const product =
            productList.find(
                product => product.id === item.id
            );
        if (!product) {
            return;
        }
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img
                class="cart-item__image"
                src="${item.image}"
                alt="${languageData[PRODUCT_TITLE_KEYS[product.id]]}">
            <div class="cart-item__content">
                <h3 class="cart-item__title">
                    ${languageData[PRODUCT_TITLE_KEYS[product.id]]}
                </h3>
                <p class="cart-item__category">
                    ${languageData.beautyLip}
                </p>
                <span class="cart-item__price number">
                    ${formatCartPrice(item.price)}
                </span>
            </div>
            <div class="cart-item__actions">
                <div class="cart-qty">
                    <button
                        class="number"
                        data-action="decrease"
                        data-id="${item.id}">
                        -
                    </button>
                    <span class="number">
                        ${item.quantity}
                    </span>
                    <button
                        class="number"
                        data-action="increase"
                        data-id="${item.id}">
                        +
                    </button>
                </div>
                <button
                    class="cart-remove"
                    data-action="remove"
                    data-id="${item.id}">
                    ${languageData.remove}
                </button>
            </div>
        `;
        cartElements.body.appendChild(cartItem);
    });
    updateCartTotal();
}

/* ==========================================================
   UPDATE CART TOTAL
========================================================== */
function updateCartTotal() {
    if (!cartElements.total) {
        return;
    }
    cartElements.total.textContent =
        formatCartPrice(
            calculateCartTotal()
        );
}

/* ==========================================================
   ADD PRODUCT TO CART
========================================================== */
function addProductToCart(product) {
    const existingProduct =
        cartItems.find(
            item => item.id === product.id
        );
    if (product.stock <= 0) {
        showToast(
            "warning",
            "outOfStock"
        );
        return;
    }
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems.push({
            id: product.id,
            image: product.images[0],
            price: product.price,
            quantity: 1
        });
    }
    saveCart();
    showToast(
        "success",
        "added"
    );
}

/* ==========================================================
   CART BUTTON EVENTS
========================================================== */
function registerCartEvents() {
    const cartButton =
        document.getElementById(
            "shopping-cart-button"
        );
    cartButton?.addEventListener(
        "click",
        () => {
            openCart();
        }
    );
    cartElements.closeButton
        ?.addEventListener(
            "click",
            closeCart
        );
    cartElements.overlay
        ?.addEventListener(
            "click",
            closeCart
        );
    cartElements.body
        ?.addEventListener(
            "click",
            (event) => {
                const button =
                    event.target.closest(
                        "[data-action]"
                    );
                if (!button) {
                    return;
                }

                const id = button.dataset.id;
                const action =
                    button.dataset.action;
                if (action === "increase") {
                    changeQuantity(
                        id,
                        1
                    );
                }
                if (action === "decrease") {
                    changeQuantity(
                        id,
                        -1
                    );
                }
                if (action === "remove") {
                    removeCartItem(id);
                }
            }
        );
}

/* ==========================================================
   CHANGE QUANTITY
========================================================== */
function changeQuantity(id, value) {
    const item =
        cartItems.find(
            product => product.id === id
        );
    if (!item) {
        return;
    }
    item.quantity += value;
    if (item.quantity <= 0) {
        removeCartItem(id);
        return;
    }
    saveCart();
    renderCart();
}

/* ==========================================================
   REMOVE CART ITEM
========================================================== */
function removeCartItem(id) {
    cartItems =
        cartItems.filter(
            item => item.id !== id
        );
    saveCart();
    renderCart();
    showToast(
        "remove",
        "removed"
    );
}

/* ==========================================================
   TOAST CSS INJECTION
   Toast has no separate CSS file
   Center position RTL + LTR
========================================================== */
function injectToastStyles() {
    const style = document.createElement("style");
    style.textContent = `
    /* ================= TOAST CONTAINER ================= */
    .toast-container{
      position:fixed;
      top:var(--space-5);
      display:flex;
      flex-direction:column;
      gap:var(--space-3);
      z-index:9999;
    }
    /* RTL */
    [dir="rtl"] .toast-container{
      left:var(--space-5);
      right:auto;
    }
    /* LTR */
    [dir="ltr"] .toast-container{
      right:var(--space-5);
      left:auto;
    }
    `;
    document.head.appendChild(style);
}

/* ==========================================================
   CREATE TOAST CONTAINER
========================================================== */
function createToastContainer() {
    if (document.querySelector(".toast-container")) {
        return;
    }
    const container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
}

/* ==========================================================
   SHOW TOAST MESSAGE
========================================================== */
function showToast(type, messageKey) {
    const languageData = getLanguageData();
    const messages = {
        added: languageData.productAdded,
        removed: languageData.productRemoved,
        outOfStock: languageData.productOutOfStock,
        error: languageData.productError
    };
    const icons = {
        success: "✓",
        remove: "✓",
        warning: "⚠",
        error: "✕"
    };
    const toast = document.createElement("div");
    toast.className =
        `toast toast-${type}`;
    toast.innerHTML = `
    <span class="toast__icon">
        ${icons[type]}
    </span>
    <span class="toast__message">
        ${messages[messageKey]}
    </span>
    `;
    document
        .querySelector(".toast-container")
        ?.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/* ==========================================================
   PRODUCT CART BUTTON EVENTS
   Add product without opening cart
========================================================== */
function registerProductCartEvents() {
    elements.productGrid
        ?.addEventListener(
            "click",
            (event) => {
                const button =
                    event.target.closest(
                        ".add-to-cart"
                    );
                if (!button) {
                    return;
                }
                const card =
                    button.closest(
                        ".product-card"
                    );

                const productId = card.dataset.id;
                const product =
                    productList.find(
                        item => item.id === productId
                    );
                if (product) {
                    addProductToCart(product);
                }
            }
        );
}

/* ==========================================================
   LANGUAGE BUTTONS
========================================================== */
const languageButtons = {
    english: document.getElementById("lang-en"),
    dari: document.getElementById("lang-fa")
};

/* ==========================================================
   PAGE ELEMENTS
========================================================== */
const elements = {
    page: document.querySelector(".plp-page"),
    pageTitle: document.getElementById("page-title"),
    categoryTitle: document.getElementById("category-title"),
    categoryDescription: document.getElementById("category-description"),
    productCount: document.getElementById("product-count"),
    breadcrumbHome: document.getElementById("breadcrumb-home"),
    breadcrumbBeautyLip: document.getElementById("breadcrumb-beauty-lip"),
    breadcrumbLipTint: document.getElementById("breadcrumb-lip-tint"),
    searchInput: document.getElementById("search-products"),
    productGrid: document.getElementById("product-grid"),
    emptyState: document.getElementById("empty-state"),
    emptyTitle: document.getElementById("empty-title"),
    emptyDescription: document.getElementById("empty-description"),
    skeletonTemplate: document.getElementById("plp-product-skeleton"),
    skeletonContainer: document.getElementById("skeleton-container"),
    cartSkeletonTemplate: document.getElementById("shopping-cart-skeleton"),
    cartSkeletonContainer: document.getElementById("cart-skeleton-container")
};

/* ==========================================================
   LANGUAGE DATA
========================================================== */
function getLanguageData() {
    return translations[currentLanguage];
}
function updateDirection() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
        currentLanguage === "fa" ? "rtl" : "ltr";
}
function updateTexts() {
    const languageData = getLanguageData();
    elements.pageTitle.textContent =
        languageData.pageTitle;
    elements.categoryTitle.textContent =
        languageData.headerTitle;
    elements.categoryDescription.textContent =
        languageData.headerDescription;
    elements.productCount.textContent =
        `${getTotalProducts(productList)} ${languageData.products}`;
    elements.breadcrumbHome.textContent =
        languageData.breadcrumbHome;
    elements.breadcrumbBeautyLip.textContent =
        languageData.breadcrumbBeautyLip;
    elements.breadcrumbLipTint.textContent =
        languageData.breadcrumbLipTint;
    elements.searchInput.placeholder =
        languageData.searchPlaceholder;
    elements.emptyTitle.textContent =
        languageData.emptyTitle;
    elements.emptyDescription.textContent =
        languageData.emptyDescription;
}

/* ==========================================================
   UPDATE CART TEXTS
========================================================== */
function updateCartTexts() {
    const languageData = getLanguageData();
    const cartTitle =
        document.querySelector(".cart-title");
    const subtotal =
        document.querySelector(".cart-total span");
    const checkout =
        document.querySelector(".cart-checkout");
    if (cartTitle) {
        cartTitle.textContent =
            languageData.cartTitle;
    }
    if (subtotal) {
        subtotal.textContent =
            languageData.subtotal;
    }
    if (checkout) {
        checkout.textContent =
            languageData.checkoutWhatsapp;
    }
}
function changeLanguage(language) {
    currentLanguage = language;
    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );
    updateDirection();
    updateTexts();
    updateCartTexts();
    updateCartTotal();
    renderProducts(productList);
    renderCart();
}

/* ==========================================================
   PRICE FORMAT
========================================================== */
function formatPrice(price) {
    return currentLanguage === "fa"
        ? `${price} افغانی`
        : `${price} AFN`;
}

/* ==========================================================
   SKELETON
========================================================== */
function showSkeleton() {
    elements.skeletonContainer.innerHTML = "";
    const skeleton =
        elements.skeletonTemplate.content.cloneNode(true);
    elements.skeletonContainer.appendChild(skeleton);
}
function hideSkeleton() {
    elements.skeletonContainer.innerHTML = "";
}
function hidePage() {
    elements.page.hidden = true;
}
function showPage() {
    elements.page.hidden = false;
}

/* ==========================================================
   PAGE LOADING
========================================================== */
function handlePageLoading() {
    hidePage();
    showSkeleton();
    setTimeout(() => {
        hideSkeleton();
        updateDirection();
        updateTexts();
        updateCartTexts();
        renderProducts(productList);
        showPage();
    }, SKELETON_DELAY);
}

/* ==========================================================
   CREATE PRODUCT CARD
========================================================== */
function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;
    const languageData = getLanguageData();
    const title =
        languageData[PRODUCT_TITLE_KEYS[product.id]];
    const badge =
        languageData[product.badge.toLowerCase()] ||
        product.badge;
    card.innerHTML = `
    <div class="product-card__media">
        <img
        class="product-card__image"
        src="${product.images[0]}"
        alt="${title}"
        loading="lazy"
        width="400"
        height="500">
        ${product.badge
            ?
            `<span class="product-card__badge">
                ${currentLanguage === "fa"
                ? translations.fa.sale
                : translations.en.sale
            }
             </span>`
            :
            ""
        }
        <button class="product-card__floating-cart icon-button add-to-cart" aria-label="${languageData.addToCart}">
            <svg height="24px" width="24px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier"> 
                <style type="text/css"> .st0{fill:#ffffff;} </style> 
                <g> 
                  <path class="st0" d="M456.169,230.305c-31.675-12.846-55.203-36.078-78.763-73.623c-27.405-43.677-29.413-80.099-41.628-104.848 C322.908,25.733,293.11,0,256.13,0c-36.971,0-66.778,25.733-79.648,51.834c-12.214,24.749-14.231,68.025-34.774,110.833 c-19.183,39.971-56.507,59.941-85.617,67.638c-25.396,6.73-17.854,28.864-17.854,28.864l22.338,161.51 C67.814,473.028,112.557,512,165.399,512h181.463c52.842,0,97.584-38.972,104.832-91.322l22.33-161.51 C474.024,259.169,480.516,240.182,456.169,230.305z M311.981,181.635c0,17.748-4.476,34.168-7.829,40.972 c-7.672,15.543-25.97,22.264-48.022,22.264c-22.051,0-40.348-6.722-48.022-22.264c-3.344-6.804-7.829-23.224-7.829-40.972v-56.416 c0-17.74,4.484-34.168,7.829-40.955c7.673-15.55,25.97-32.282,48.022-32.282c22.052,0,40.349,16.732,48.022,32.282 c3.353,6.788,7.829,23.216,7.829,40.955V181.635z"></path> 
                </g> 
              </g>
            </svg>
        </button>
    </div>
    <div class="product-card__content">
        <h3 class="product-card__title">
            ${title}
        </h3>
        <div class="product-card__price">
            ${product.oldPrice
            ?
            `<span class="product-card__old-price number">
                    ${formatPrice(product.oldPrice)}
                </span>`
            :
            ""
        }
            <span class="product-card__new-price number">
                ${formatPrice(product.price)}
            </span>
        </div>
        <div class="product-card__details btn btn-ghost">
            <a href="../Beauty-lip-pdp/Bu-lip-pdp.html?id=${product.id}" class="product-card__details-link">
                ${currentLanguage === "fa"
            ? ` ${translations.fa.viewDetails} ←`
            : `${translations.en.viewDetails} →`
        }
            </a>
        </div>
    </div>
    `;
    return card;
}

/* ==========================================================
   RENDER PRODUCTS
========================================================== */
function renderProducts(products) {
    elements.productGrid.innerHTML = "";
    if (products.length === 0) {
        elements.emptyState.hidden = false;
        elements.productCount.textContent =
            `0 ${getLanguageData().products}`;
        return;
    }
    elements.emptyState.hidden = true;
    products.forEach(product => {
        elements.productGrid.appendChild(
            createProductCard(product)
        );
    });
    elements.productCount.textContent =
        `${getTotalProducts(products)} ${getLanguageData().products}`;
}

/* ==========================================================
   SEARCH SYSTEM
========================================================== */
function handleSearch() {
    const value =
        elements.searchInput.value
            .trim()
            .toLowerCase();
    const filteredProducts =
        productList.filter(product => {
            const productName =
                getLanguageData()
                [PRODUCT_TITLE_KEYS[product.id]]
                    .toLowerCase();
            return productName.includes(value);
        });
    renderProducts(filteredProducts);
}

/* ==========================================================
   EVENTS
========================================================== */
function registerEvents() {
    languageButtons.english?.addEventListener(
        "click",
        () => {
            changeLanguage("en");
        }
    );
    languageButtons.dari?.addEventListener(
        "click",
        () => {
            changeLanguage("fa");
        }
    );
    elements.searchInput?.addEventListener(
        "input",
        handleSearch
    );
}

/* ==========================================================
   INITIALIZE PAGE
========================================================== */
function initializePage() {
    currentLanguage = getCurrentLanguage();
    injectCartSkeletonStyles();
    injectToastStyles();
    createCartDrawer();
    createToastContainer();
    getCartElements();
    registerCartEvents();
    registerProductCartEvents();
    registerEvents();
    handlePageLoading();
}
initializePage();