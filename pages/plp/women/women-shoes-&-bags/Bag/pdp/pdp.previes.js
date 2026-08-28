import { i18n } from "./pdp.i18n.js";

import { products as diorProducts } from "../dior/dior.data.js";
import { products as hermesProducts } from "../hermes/hermes.data.js";
import { products as lvProducts } from "../lv/lv.data.js";
import { products as yslProducts } from "../ysl/ysl.data.js";

const root = document.getElementById("root");

let lang = localStorage.getItem("lang") || "en";

if (lang !== "en" && lang !== "fa") {
  lang = "en";
}

const allProducts = [
  ...diorProducts,
  ...hermesProducts,
  ...lvProducts,
  ...yslProducts
];

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


const product = allProducts.find(
  (item) => String(item.id) === String(productId)
);


function renderPage() {
  if (!product) {
    root.innerHTML = `
      <div class="pdp-not-found">
        ${i18n[lang].productNotFound}
      </div>
    `;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

    return;
  }

  const productName = product.name?.[lang] || product.name?.en || "";

  const productColor = product.color?.[lang] || product.color?.en || "";

  const productSize = product.size?.[lang] || product.size?.en || "";

  const productBadge = product.badge?.[lang] || product.badge?.en || "";

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
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
            alt="${productName}"
          >

        </div>

        <div class="pdp-main-media">

          <img
            id="mainImage"
            src="${product.image}"
            alt="${productName}"
          >

        </div>

      </div>


      <div class="pdp-info">

        <span class="pdp-category">
          ${i18n[lang].category}
        </span>

        <h1 class="pdp-title">
          ${productName}
        </h1>

        <p class="pdp-subtitle">
          ${productBadge}
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
        ${i18n[lang].description}
      </p>

    </section>


    <section class="pdp-specs">

      <h2>
        ${i18n[lang].specificationsTitle}
      </h2>

      <table>

        <tr>
          <th>${i18n[lang].categoryLabel}</th>
          <td>${i18n[lang].categoryValue}</td>
        </tr>

        <tr>
          <th>${i18n[lang].genderLabel}</th>
          <td>${i18n[lang].genderValue}</td>
        </tr>

        <tr>
          <th>${i18n[lang].colorLabel}</th>

          <td>
            <span class="spec-color-name">
              ${productColor}
            </span>
          </td>
        </tr>

        <tr>
          <th>${i18n[lang].sizesLabel}</th>
          <td>${productSize}</td>
        </tr>

        <tr>
          <th>${i18n[lang].badgeLabel}</th>
          <td>${productBadge}</td>
        </tr>

      </table>

    </section>
  `;

  renderBreadcrumb();
  attachGalleryEvents();
  attachCartEvent();

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}


function renderBreadcrumb() {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) return;

  const productName = product?.name?.[lang] || "";

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
      ${productName}
    </span>
  `;
}


function attachGalleryEvents() {
  const thumbnails = document.querySelectorAll(".pdp-thumbnails img");
  const mainImage = document.getElementById("mainImage");

  if (!mainImage || !thumbnails.length) return;

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {

      mainImage.src =
        thumbnail.dataset.full || thumbnail.src;

      thumbnails.forEach((item) => {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });
  });
}


function attachCartEvent() {
  const button = document.getElementById("add-to-cart");

  if (!button) return;

  button.addEventListener("click", () => {
    alert(i18n[lang].addedToCart);
  });
}


window.addEventListener("languageChanged", (event) => {
  const newLang = event.detail?.lang;

  if (newLang !== "en" && newLang !== "fa") return;

  lang = newLang;

  localStorage.setItem("lang", lang);

  renderPage();
});


document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");

  if (!button) return;

  const newLang = button.dataset.lang;

  if (newLang !== "en" && newLang !== "fa") return;

  lang = newLang;

  localStorage.setItem("lang", lang);

  renderPage();
});


renderPage();