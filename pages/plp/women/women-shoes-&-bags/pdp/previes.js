import { i18n } from "./i18n.js";

const root = document.getElementById("root");

let lang = localStorage.getItem("lang") || "en";

if (lang !== "en" && lang !== "fa") {
  lang = "en";
}

function renderPage() {
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
            src="../images/heel8.jpg"
            data-full="../images/heel8.jpg"
            class="active"
            alt="${i18n[lang].productImage}"
          >

          <img
            src="../images/boot10.jpg"
            data-full="../images/boot10.jpg"
            alt="${i18n[lang].productImage}"
          >

          <img
            src="../images/heel3.jpg"
            data-full="../images/heel3.jpg"
            alt="${i18n[lang].productImage}"
          >

          <img
            src="../images/heel4.jpg"
            data-full="../images/heel4.jpg"
            alt="${i18n[lang].productImage}"
          >

          <img
            src="../images/boot6.jpg"
            data-full="../images/boot6.jpg"
            alt="${i18n[lang].productImage}"
          >

        </div>

        <div class="pdp-main-media">

          <img
            id="mainImage"
            src="../images/heel8.jpg"
            alt="${i18n[lang].productImage}"
          >

        </div>

      </div>

      <div class="pdp-info">

        <span class="pdp-category">
          ${i18n[lang].category}
        </span>

        <h1 class="pdp-title">
          ${i18n[lang].title}
        </h1>

        <p class="pdp-subtitle">
          ${i18n[lang].subtitle}
        </p>

        <div class="pdp-price">

          <span class="pdp-old-price number">
            $120
          </span>

          <span class="pdp-current-price number">
            $96
          </span>

          <span class="pdp-discount number">
            -20%
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
            <div class="spec-colors">

              <span
                class="color-dot"
                style="background:#000;">
              </span>

              <span
                class="color-dot"
                style="background:#fff; border:1px solid #ddd;">
              </span>

              <span
                class="color-dot"
                style="background:#8B5E3C;">
              </span>

            </div>
          </td>
        </tr>

        <tr>
          <th>${i18n[lang].sizesLabel}</th>
          <td>36, 37, 38, 39</td>
        </tr>

        <tr>
          <th>${i18n[lang].materialLabel}</th>
          <td>${i18n[lang].materialValue}</td>
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
      ${i18n[lang].breadcrumbProduct}
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