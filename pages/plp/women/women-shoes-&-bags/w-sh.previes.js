import { categories } from "./w-sh.data.js";
import { i18n } from "./w-sh.i18n.js";

const root = document.getElementById("root");

let lang = localStorage.getItem("lang") || "en";
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
          id="breadcrumb"
          class="breadcrumb">
        </nav>

        <section
          id="hero"
          class="plp-hero">
        </section>

        <div
          id="search-box"
          class="search-box">
        </div>

        <div
          id="collection-root"
          class="plp-category-grid">
        </div>

      </div>

    </section>
  `;

  renderBreadcrumb();
  renderHero();
  renderSearch();
  renderCategories();

  document.documentElement.lang = lang;

  document.documentElement.dir =
    lang === "fa"
      ? "rtl"
      : "ltr";
}

function renderBreadcrumb() {
  const breadcrumb =
    document.getElementById("breadcrumb");

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
  const hero =
    document.getElementById("hero");

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
        src="./images/shose-baner.jpg"
        alt="${i18n[lang].pageTitle}">

    </div>
  `;
}

function renderSearch() {
  const searchBox =
    document.getElementById("search-box");

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

  const input =
    searchBox.querySelector(
      ".search-box__input"
    );

  input.addEventListener("input", (event) => {
    const value =
      event.target.value
        .trim()
        .toLowerCase();

    filteredCategories =
      categories.filter((category) => {

        const name =
          category.name?.[lang]
            ?.toLowerCase() || "";

        return name.includes(value);
      });

    renderCategories(filteredCategories);
  });
}

function renderCategories(
  list = filteredCategories
) {
  const collectionRoot =
    document.getElementById(
      "collection-root"
    );

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

  collectionRoot.innerHTML =
    list
      .map(
        (category) => `
          <a
            href="${category.link}"
            class="plp-category-card">

            <img
              src="${category.image}"
              alt="${category.name[lang]}">

            <div
              class="plp-category-card__body">

              <h3>
                ${category.name[lang]}
              </h3>

              <span>
                ${category.productCount}
              </span>

            </div>

          </a>
        `
      )
      .join("");
}

renderPage();

document.addEventListener(
  "click",
  (event) => {

    const languageButton =
      event.target.closest(
        "[data-lang]"
      );

    if (!languageButton) {
      return;
    }

    const selectedLanguage =
      languageButton.dataset.lang;

    if (
      selectedLanguage !== "en" &&
      selectedLanguage !== "fa"
    ) {
      return;
    }

    lang = selectedLanguage;

    localStorage.setItem(
      "lang",
      lang
    );

    filteredCategories =
      [...categories];

    renderPage();
  }
);