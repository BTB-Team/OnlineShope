import { products as boots } from "../Boots/boots.data.js";
import { products as heels } from "../Heels/heels.data.js";
import { products as sandals } from "../sandals/sandals.data.js";
import { products as sneakers } from "../sneakers/sneakers.data.js";

import { i18n } from "./pdp.i18n.js";

const root = document.getElementById("root");

let lang = localStorage.getItem("lang") || "en";

if (lang !== "en" && lang !== "fa") {
  lang = "en";
}

/* --------------------------------
   Get product ID from URL
-------------------------------- */

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

/* --------------------------------
   All PLP products
-------------------------------- */

const allProducts = [
  ...boots,
  ...heels,
  ...sandals,
  ...sneakers
];

/* --------------------------------
   Find selected product
-------------------------------- */

const product = allProducts.find(
  (item) => Number(item.id) === productId
);

/* --------------------------------
   Find product category
-------------------------------- */

function getCategory() {
  if (productId >= 1 && productId <= 99) {
    return {
      en: "Boots",
      fa: "بوت"
    };
  }

  if (productId >= 100 && productId <= 199) {
    return {
      en: "Heels",
      fa: "کفش پاشنه‌بلند"
    };
  }

  if (productId >= 200 && productId <= 299) {
    return {
      en: "Sandals",
      fa: "صندل"
    };
  }

  if (productId >= 300 && productId <= 399) {
    return {
      en: "Sneakers",
      fa: "کتانی"
    };
  }

  return {
    en: "Shoes",
    fa: "کفش"
  };
}

/* --------------------------------
   Product not found
-------------------------------- */

if (!product) {
  root.innerHTML = `
    <div class="pdp-error">
      <h2>${i18n[lang].productNotFound}</h2>
    </div>
  `;
} else {
  renderPage();
}

/* --------------------------------
   Render page
-------------------------------- */

function renderPage() {
  const category = getCategory();

  const discount =
    product.oldPrice > product.newPrice
      ? Math.round(
          ((product.oldPrice - product.newPrice) /
            product.oldPrice) *
            100
        )
      : 0;

  root.innerHTML = `
    <div class="language-switcher">
      <button type="button" data-lang="en">EN</button>
      <button type="button" data-lang="fa">FA</button>
    </div>

    <nav class="breadcrumb" id="breadcrumb"></nav>

    <div class="pdp">

      <div class="pdp-media">

        <div class="pdp-thumbnails">

          <img
            src="${product.image}"
            data-full="${product.image}"
            class="active"
            alt="${i18n[lang].productImage}"
          >

        </div>

        <div class="pdp-main-media">

          <img
            id="mainImage"
            src="${product.image}"
            alt="${i18n[lang].productImage}"
          >

        </div>

      </div>

      <div class="pdp-info">

        <span class="pdp-category">
          ${category[lang]}
        </span>

        <h1 class="pdp-title">
          ${product.name[lang]}
        </h1>

        <p class="pdp-subtitle">
          ${i18n[lang].productSubtitle}
        </p>

        <div class="pdp-price">

          <span class="pdp-old-price number">
            $${product.oldPrice}
          </span>

          <span class="pdp-current-price number">
            $${product.newPrice}
          </span>

          <span class="pdp-discount number">
            -${discount}%
          </span>

        </div>

        <button
          type="button"
          class="btn btn-primary"
          id="add-to-cart"
        >
          ${i18n[lang].addToCart}
        </button>

      </div>

    </div>

    <section class="pdp-description">

      <h2>
        ${i18n[lang].descriptionTitle}
      </h2>

      <p>
        ${i18n[lang].productDescription}
      </p>

    </section>

    <section class="pdp-specs">

      <h2>
        ${i18n[lang].specificationsTitle}
      </h2>

      <table>

        <tr>
          <th>${i18n[lang].categoryLabel}</th>
          <td>${category[lang]}</td>
        </tr>

        <tr>
          <th>${i18n[lang].genderLabel}</th>
          <td>${i18n[lang].genderValue}</td>
        </tr>

        <tr>
          <th>${i18n[lang].colorLabel}</th>
          <td>${product.color[lang]}</td>
        </tr>

        <tr>
          <th>${i18n[lang].sizesLabel}</th>
          <td>${product.size[lang]}</td>
        </tr>

      </table>

    </section>
  `;

  renderBreadcrumb();
  attachGalleryEvents();
  attachCartEvent();

  document.documentElement.lang = lang;
  document.documentElement.dir =
    lang === "fa" ? "rtl" : "ltr";
}

/* --------------------------------
   Breadcrumb
-------------------------------- */

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

    <a href="#">
      ${i18n[lang].breadcrumbWomen}
    </a>

    <span>/</span>

    <span>
      ${product.name[lang]}
    </span>
  `;
}

/* --------------------------------
   Gallery
-------------------------------- */

function attachGalleryEvents() {
  const thumbnails =
    document.querySelectorAll(
      ".pdp-thumbnails img"
    );

  const mainImage =
    document.getElementById("mainImage");

  if (!mainImage || !thumbnails.length) return;

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      mainImage.src =
        thumbnail.dataset.full ||
        thumbnail.src;

      thumbnails.forEach((item) => {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });
  });
}

/* --------------------------------
   Add to cart
-------------------------------- */

function attachCartEvent() {
  const button =
    document.getElementById("add-to-cart");

  if (!button) return;

  button.addEventListener("click", () => {
    alert(i18n[lang].addedToCart);
  });
}

/* --------------------------------
   Language buttons
-------------------------------- */

document.addEventListener("click", (event) => {
  const button =
    event.target.closest("[data-lang]");

  if (!button) return;

  const newLang = button.dataset.lang;

  if (newLang !== "en" && newLang !== "fa") {
    return;
  }

  lang = newLang;

  localStorage.setItem("lang", lang);

  if (product) {
    renderPage();
  }
});

/* --------------------------------
   External language change
-------------------------------- */

window.addEventListener(
  "languageChanged",
  (event) => {
    const newLang =
      event.detail?.lang;

    if (newLang !== "en" && newLang !== "fa") {
      return;
    }

    lang = newLang;

    localStorage.setItem("lang", lang);

    if (product) {
      renderPage();
    }
  }
);