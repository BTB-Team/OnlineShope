import { products } from "./sneakers.data.js";
import { i18n } from "./sneakers.i18n.js";

const root = document.getElementById("root");

// ===============================
// LANGUAGE
// ===============================

let lang = localStorage.getItem("lang") || "en";

if (lang !== "en" && lang !== "fa") {
  lang = "en";
}

// ===============================
// CART
// ===============================

const CART_STORAGE_KEY = "shoeCart";

let cart = JSON.parse(
  localStorage.getItem(CART_STORAGE_KEY)
) || [];

let filteredProducts = [...products];

// ===============================
// TEXT
// ===============================

function text(value) {
  if (value && typeof value === "object") {
    return value[lang] || value.en || "";
  }

  return value || "";
}

// ===============================
// RENDER LAYOUT
// ===============================

function renderLayout() {
  root.innerHTML = `
    <div class="language-switcher">

      <button
        type="button"
        data-lang="en"
        class="${lang === "en" ? "active" : ""}">
        EN
      </button>

      <button
        type="button"
        data-lang="fa"
        class="${lang === "fa" ? "active" : ""}">
        FA
      </button>

    </div>

    <div class="cart-overlay"></div>

    <aside class="cart-drawer">

      <div class="cart-header">

        <h2 class="cart-title">
          ${i18n[lang].cartTitle}
        </h2>

        <button
          type="button"
          class="cart-close"
          aria-label="${i18n[lang].cartClose || i18n[lang].close || ""}">
          ✕
        </button>

      </div>

      <div class="cart-body"></div>

      <div class="cart-footer">

        <div class="cart-total">

          <span>
            ${i18n[lang].subtotal}
          </span>

          <strong class="number">
            $0
          </strong>

        </div>

        <button
          type="button"
          class="cart-checkout">
          ${i18n[lang].checkout}
        </button>

      </div>

    </aside>

    <section class="ui-section">

      <div class="container">

        <nav
          class="breadcrumb"
          id="breadcrumb">
        </nav>

        <section
          class="plp-header"
          id="plp-header">
        </section>

        <div
          class="search-box"
          id="search-box">
        </div>

        <div
          class="product-grid"
          id="product-grid">
        </div>

      </div>

    </section>
  `;

  renderBreadcrumb();
  renderHeader();
  renderSearch();
  renderProducts(filteredProducts);
  renderCart();

  attachCartDrawerEvents();

  document.documentElement.lang = lang;

  document.documentElement.dir =
    lang === "fa"
      ? "rtl"
      : "ltr";
}

// ===============================
// RENDER BREADCRUMB
// ===============================

function renderBreadcrumb() {
  const breadcrumb =
    document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  breadcrumb.innerHTML = `
    <a href="#">
      ${i18n[lang].breadcrumbHome}
    </a>

    <span>/</span>

    <a href="#">
      ${i18n[lang].breadcrumbCollection}
    </a>

    <span>/</span>

    <span>
      ${i18n[lang].breadcrumbPage}
    </span>
  `;
}

// ===============================
// RENDER HEADER
// ===============================

function renderHeader() {
  const header =
    document.getElementById("plp-header");

  if (!header) return;

  header.innerHTML = `
    <h1 class="plp-header__title">
      ${i18n[lang].pageTitle}
    </h1>

    <p class="plp-header__description">
      ${i18n[lang].pageDescription}
    </p>

    <span class="plp-header__count number">
      ${products.length}
      ${i18n[lang].products}
    </span>
  `;
}

// ===============================
// SEARCH
// ===============================

function renderSearch() {
  const searchBox =
    document.getElementById("search-box");

  if (!searchBox) return;

  searchBox.innerHTML = `
    <svg
      class="search-box__icon"
      viewBox="0 0 24 24"
      aria-hidden="true">

      <path
        d="M10 18a8 8 0 1 1 5.292-14.002A8 8 0 0 1 10 18zm11 3-6-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round">
      </path>

    </svg>

    <input
      class="search-box__input"
      type="search"
      placeholder="${i18n[lang].searchPlaceholder}"
      autocomplete="off">
  `;

  const input =
    searchBox.querySelector(
      ".search-box__input"
    );

  if (!input) return;

  input.addEventListener("input", (event) => {

    const value =
      event.target.value
        .trim()
        .toLowerCase();

    filteredProducts =
      products.filter((product) => {

        const name =
          text(product.name)
            .toLowerCase();

        const badge =
          text(product.badge)
            .toLowerCase();

        return (
          name.includes(value) ||
          badge.includes(value)
        );
      });

    renderProducts(filteredProducts);
  });
}

// ===============================
// PRODUCTS
// ===============================

function renderProducts(list = products) {

  const container =
    document.getElementById("product-grid");

  if (!container) return;

  if (!list.length) {

    container.innerHTML = `
      <div class="product-grid__empty">

        <h3>
          ${i18n[lang].noProducts}
        </h3>

        <p>
          ${i18n[lang].tryAnotherKeyword}
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML =
    list.map((product) => `

      <article class="product-card">

        <div class="product-card__media">

          <img
            class="product-card__image"
            src="${product.image}"
            alt="${text(product.name)}">

          ${
            product.badge
              ? `
                <span class="product-card__badge">
                  ${text(product.badge)}
                </span>
              `
              : ""
          }

          <button
            type="button"
            class="product-card__floating-cart icon-button"
            data-id="${product.id}"
            aria-label="${i18n[lang].addToCart}">

            <svg
              height="24px"
              width="24px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">

              <path
                fill="#ffffff"
                d="M456.169,230.305c-31.675-12.846-55.203-36.078-78.763-73.623c-27.405-43.677-29.413-80.099-41.628-104.848C322.908,25.733,293.11,0,256.13,0c-36.971,0-66.778,25.733-79.648,51.834c-12.214,24.749-14.231,68.025-34.774,110.833c-19.183,39.971-56.507,59.941-85.617,67.638c-25.396,6.73-17.854,28.864-17.854,28.864l22.338,161.51C67.814,473.028,112.557,512,165.399,512h181.463c52.842,0,97.584-38.972,104.832-91.322l22.33-161.51C474.024,259.169,480.516,240.182,456.169,230.305zM311.981,181.635c0,17.748-4.476,34.168-7.829,40.972c-7.672,15.543-25.97,22.264-48.022,22.264c-22.051,0-40.348-6.722-48.022-22.264c-3.344-6.804-7.829-23.224-7.829-40.972v-56.416c0-17.74,4.484-34.168,7.829-40.955c7.673-15.55,25.97-32.282,48.022-32.282c22.052,0,40.349,16.732,48.022,32.282c3.353,6.788,7.829,23.216,7.829,40.955V181.635z">
              </path>

            </svg>

          </button>

        </div>

        <div class="product-card__content">

          <h3 class="product-card__title">
            ${text(product.name)}
          </h3>

          <div class="product-card__price">

            <span class="product-card__old-price number">
              $${product.oldPrice}
            </span>

            <span class="product-card__new-price number">
              $${product.newPrice}
            </span>

          </div>

          <div class="product-card__details btn btn-ghost">

            <a href="${product.link}">
              ${i18n[lang].viewDetails} →
            </a>

          </div>

        </div>

      </article>

    `).join("");

  attachCartEvents();
}

// ===============================
// ADD TO CART
// ===============================

function attachCartEvents() {

  const buttons =
    document.querySelectorAll(
      ".product-card__floating-cart"
    );

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      const id =
        Number(button.dataset.id);

      const product =
        products.find(
          (item) =>
            Number(item.id) === id
        );

      if (!product) return;

      const existing =
        cart.find(
          (item) =>
            Number(item.id) === id
        );

      if (existing) {

        existing.quantity =
          (Number(existing.quantity) || 1) + 1;

      } else {

        cart.push({
          ...product,
          quantity: 1
        });
      }

      // ذخیره فقط در سبد کفش
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );

      renderCart();
      openCart();
    });
  });
}

// ===============================
// RENDER CART
// ===============================

function renderCart() {

  const body =
    document.querySelector(".cart-body");

  const title =
    document.querySelector(".cart-title");

  const checkout =
    document.querySelector(".cart-checkout");

  const totalBox =
    document.querySelector(".cart-total");

  if (!body) return;

  if (title) {
    title.textContent =
      i18n[lang].cartTitle;
  }

  if (checkout) {
    checkout.textContent =
      i18n[lang].checkout;
  }

  if (!cart.length) {

    body.innerHTML = `
      <div class="cart-empty">

        <p>
          ${i18n[lang].emptyCart}
        </p>

      </div>
    `;

    if (totalBox) {

      totalBox.innerHTML = `
        <span>
          ${i18n[lang].subtotal}
        </span>

        <strong class="number">
          $0
        </strong>
      `;
    }

    return;
  }

  body.innerHTML =
    cart.map((product) => {

      const quantity =
        Number(product.quantity) || 1;

      const price =
        Number(product.newPrice) || 0;

      return `

        <div
          class="cart-item"
          data-id="${product.id}">

          <img
            class="cart-item__image"
            src="${product.image}"
            alt="${text(product.name)}">

          <div class="cart-item__content">

            <h3 class="cart-item__title">
              ${text(product.name)}
            </h3>

            <p class="cart-item__category">
              ${text(product.category)}
            </p>

            <span class="cart-item__price number">
              $${price}
            </span>

          </div>

          <div class="cart-item__actions">

            <div class="cart-qty">

              <button
                type="button"
                class="cart-qty-minus number"
                data-id="${product.id}">
                -
              </button>

              <span class="number">
                ${quantity}
              </span>

              <button
                type="button"
                class="cart-qty-plus number"
                data-id="${product.id}">
                +
              </button>

            </div>

            <button
              type="button"
              class="cart-remove"
              data-id="${product.id}">

              ${i18n[lang].remove}

            </button>

          </div>

        </div>
      `;

    }).join("");

  const total =
    cart.reduce(
      (sum, product) => {

        return (
          sum +
          (Number(product.newPrice) || 0) *
          (Number(product.quantity) || 1)
        );

      },
      0
    );

  if (totalBox) {

    totalBox.innerHTML = `
      <span>
        ${i18n[lang].subtotal}
      </span>

      <strong class="number">
        $${total}
      </strong>
    `;
  }

  attachCartItemEvents();
}

// ===============================
// CART ITEM EVENTS
// ===============================

function attachCartItemEvents() {

  document
    .querySelectorAll(".cart-qty-minus")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          const product =
            cart.find(
              (item) =>
                Number(item.id) === id
            );

          if (!product) return;

          product.quantity =
            (Number(product.quantity) || 1) - 1;

          if (product.quantity <= 0) {

            cart =
              cart.filter(
                (item) =>
                  Number(item.id) !== id
              );
          }

          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
          );

          renderCart();
        }
      );
    });

  document
    .querySelectorAll(".cart-qty-plus")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          const product =
            cart.find(
              (item) =>
                Number(item.id) === id
            );

          if (!product) return;

          product.quantity =
            (Number(product.quantity) || 1) + 1;

          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
          );

          renderCart();
        }
      );
    });

  document
    .querySelectorAll(".cart-remove")
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(button.dataset.id);

          cart =
            cart.filter(
              (item) =>
                Number(item.id) !== id
            );

          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cart)
          );

          renderCart();
        }
      );
    });
}

// ===============================
// OPEN CART
// ===============================

function openCart() {

  const overlay =
    document.querySelector(".cart-overlay");

  const drawer =
    document.querySelector(".cart-drawer");

  if (!overlay || !drawer) return;

  overlay.classList.add("active");
  drawer.classList.add("active");
}

// ===============================
// CLOSE CART
// ===============================

function closeCart() {

  const overlay =
    document.querySelector(".cart-overlay");

  const drawer =
    document.querySelector(".cart-drawer");

  if (!overlay || !drawer) return;

  overlay.classList.remove("active");
  drawer.classList.remove("active");
}

// ===============================
// CART DRAWER EVENTS
// ===============================

function attachCartDrawerEvents() {

  const overlay =
    document.querySelector(".cart-overlay");

  const closeButton =
    document.querySelector(".cart-close");

  if (overlay) {
    overlay.addEventListener(
      "click",
      closeCart
    );
  }

  if (closeButton) {
    closeButton.addEventListener(
      "click",
      closeCart
    );
  }
}

// ===============================
// LANGUAGE
// ===============================

window.addEventListener(
  "languageChanged",
  (event) => {

    const newLang =
      event.detail?.lang;

    if (
      newLang !== "en" &&
      newLang !== "fa"
    ) {
      return;
    }

    lang = newLang;

    localStorage.setItem(
      "lang",
      lang
    );

    filteredProducts =
      [...products];

    renderLayout();
  }
);

document.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest(
        "[data-lang]"
      );

    if (!button) return;

    const newLang =
      button.dataset.lang;

    if (
      newLang !== "en" &&
      newLang !== "fa"
    ) {
      return;
    }

    lang = newLang;

    localStorage.setItem(
      "lang",
      lang
    );

    filteredProducts =
      [...products];

    renderLayout();
  }
);

// ===============================
// START
// ===============================

renderLayout();