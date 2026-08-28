import { categories } from "./w-bag.data.js";
import { i18n } from "./w-bag.i18n.js";

const root = document.getElementById("root");

let lang = localStorage.getItem("lang") || "en";

if (lang !== "en" && lang !== "fa") {
  lang = "en";
}

let filteredCategories = [...categories];

function renderPage() {
  root.innerHTML = `
    <section class="ui-section">

      <div class="container">

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

        <nav
          class="breadcrumb"
          id="breadcrumb">
        </nav>

        <section
          class="plp-hero"
          id="hero">
        </section>

        <div
          class="search-box"
          id="search-box">
        </div>

        <div
          class="plp-category-grid"
          id="collection-root">
        </div>

      </div>

    </section>
  `;

  renderBreadcrumb();
  renderHero();
  renderSearch();
  renderCategories();

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}

function renderBreadcrumb() {
  const breadcrumb = document.getElementById("breadcrumb");

  if (!breadcrumb) {
    return;
  }
  breadcrumb.innerHTML = `
    <a href="#">
      ${i18n[lang].breadcrumbHome}
    </a>
    <span>/</span>
    <a href="#">
      ${i18n[lang].breadcrumbWomen}
    </a>
    <span>/</span>
    <span>
      ${i18n[lang].breadcrumbCollection}
    </span>
  `;
}
function renderHero() {
  const hero = document.getElementById("hero");
  if (!hero) {
    return;
  }
  hero.innerHTML = `
    <div class="plp-hero__content">
      <h1 class="plp-hero__title">
        ${i18n[lang].pageTitle}
      </h1>
      <p class="plp-hero__description">
        ${i18n[lang].pageDescription}
      </p>
    </div>
    <div class="plp-hero__media">
      <img
        src="../images/bag_baner.jpg"
        alt="${i18n[lang].pageTitle}">
    </div>
  `;
}
function renderSearch() {
  const searchBox = document.getElementById("search-box");
  if (!searchBox) {
    return;
  }
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
      type="search"
      class="search-box__input"
      placeholder="${i18n[lang].searchPlaceholder}"
      autocomplete="off">
  `;
  const input = searchBox.querySelector(".search-box__input");
  if (!input) {
    return;
  }
  input.addEventListener("input", (event) => {
    const value = event.target.value
      .trim()
      .toLowerCase();
    filteredCategories = categories.filter((category) => {
      const name =
        category.name?.[lang]?.toLowerCase() || "";
      return name.includes(value);
    });
    renderCategories(filteredCategories);
  });
}
function renderCategories(list = filteredCategories) {
  const collectionRoot =
    document.getElementById("collection-root");
  if (!collectionRoot) {
    return;
  }
  if (list.length === 0) {
    collectionRoot.innerHTML = `
      <div class="plp-category-grid__empty">
        <h3>
          ${i18n[lang].noProducts}
        </h3>
        <p>
          ${i18n[lang].tryAnotherSearch}
        </p>
      </div>
    `;
    return;
  }
  collectionRoot.innerHTML = list
    .map((category) => {
      const name =
        category.name?.[lang] || "";
      return `
        <a
          href="${category.link}"
          class="plp-category-card">
          <img
            src="${category.image}"
            alt="${name}">
          <div
            class="plp-category-card__body">
            <h3>
              ${name}
            </h3>
            <span>
              ${category.productCount}
            </span>

          </div>

        </a>
      `;
    })
    .join("");
}
function changeLanguage(selectedLanguage) {
  if (
    selectedLanguage !== "en" &&
    selectedLanguage !== "fa"
  ) {
    return;
  }
  lang = selectedLanguage;
  localStorage.setItem("lang", lang);
  filteredCategories = [...categories];
  renderPage();
}
document.addEventListener("click", (event) => {
  const languageButton =
    event.target.closest("[data-lang]");
  if (!languageButton) {
    return;
  }
  changeLanguage(languageButton.dataset.lang);
});
window.addEventListener("languageChanged", (event) => {
  const newLang = event.detail?.lang;
  if (!newLang) {
    return;
  }
  changeLanguage(newLang);
});
renderPage();