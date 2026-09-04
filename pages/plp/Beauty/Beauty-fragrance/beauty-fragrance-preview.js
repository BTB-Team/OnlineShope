/* ==========================================================
   IMPORTS
========================================================== */
import { beautyFragranceData } from "./beauty-fragrance-data.js";
import translations from "./beauty-fragrance-i18n.js";

/* ==========================================================
   CONSTANTS
========================================================== */
const DEFAULT_LANGUAGE = "en";
const SKELETON_DELAY = 1200;
const LANGUAGE_STORAGE_KEY = "selectedLanguage";

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
let categoryList = beautyFragranceData.categories;

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
    heroTitle: document.getElementById("hero-title"),
    heroDescription: document.getElementById("hero-description"),
    heroImage: document.getElementById("hero-image"),
    breadcrumbHome: document.getElementById("breadcrumb-home"),
    breadcrumbBeautyFragrance: document.getElementById("breadcrumb-beauty-fragrance"),
    searchInput: document.getElementById("search-products"),
    collectionGrid: document.getElementById("category-grid"),
    emptyState: document.getElementById("empty-state"),
    emptyTitle: document.getElementById("empty-title"),
    emptyDescription: document.getElementById("empty-description"),
    skeletonTemplate: document.getElementById("plp-skeleton"),
    skeletonContainer: document.getElementById("skeleton-container")
};

/* ==========================================================
   LOAD LANGUAGE
========================================================== */
function loadLanguage() {
    updatePageDirection();
    updatePageTexts();
    renderCategories(categoryList);
}

/* ==========================================================
   UPDATE PAGE TEXTS
========================================================== */
function updatePageTexts() {
    const languageData = translations[currentLanguage];
    elements.pageTitle.textContent =
        languageData.pageTitle;
    elements.heroTitle.textContent =
        languageData.heroTitle;
    elements.heroDescription.textContent =
        languageData.heroDescription;
    elements.heroImage.src =
        beautyFragranceData.hero.image;
    elements.heroImage.alt =
        languageData[beautyFragranceData.hero.altKey];
    elements.breadcrumbHome.textContent =
        languageData.breadcrumbHome;
    elements.breadcrumbBeautyFragrance.textContent =
        languageData.breadcrumbBeautyFragrance;
    elements.searchInput.placeholder =
        languageData.searchPlaceholder;
    elements.emptyTitle.textContent =
        languageData.emptyTitle;
    elements.emptyDescription.textContent =
        languageData.emptyDescription;
}

/* ==========================================================
   UPDATE PAGE DIRECTION
========================================================== */
function updatePageDirection() {
    document.documentElement.lang =
        currentLanguage;
    document.documentElement.dir =
        currentLanguage === "fa"
            ? "rtl"
            : "ltr";
}

/* ==========================================================
   RENDER CATEGORY GRID
========================================================== */
function renderCategories(categories) {
    elements.collectionGrid.innerHTML = "";
    if (categories.length === 0) {
        elements.emptyState.hidden = false;
        return;
    }
    elements.emptyState.hidden = true;
    categories.forEach((category) => {
        elements.collectionGrid.appendChild(
            createCategoryCard(category)
        );
    });
}

/* ==========================================================
   CREATE CATEGORY CARD
========================================================== */
function createCategoryCard(category) {
    const card =
        document.createElement("a");
    card.className =
        "plp-category-card";
    card.href =
        category.href;
    const image =
        document.createElement("img");
    image.src =
        category.image;
    image.alt =
        translations[currentLanguage][category.altKey];
    image.loading =
        "lazy";
    const body =
        document.createElement("div");
    body.className =
        "plp-category-card__body";
    const title =
        document.createElement("h3");
    title.textContent =
        translations[currentLanguage][category.titleKey];
    const count =
        document.createElement("span");
    count.textContent =
        `${category.productCount} ${translations[currentLanguage].products}`;
    body.append(
        title,
        count
    );
    card.append(
        image,
        body
    );
    return card;
}

/* ==========================================================
   SEARCH CATEGORIES
========================================================== */
function handleSearch() {
    const searchValue =
        elements.searchInput.value
            .trim()
            .toLowerCase();
    const filteredCategories =
        categoryList.filter((category) => {
            const categoryName =
                translations[currentLanguage][category.titleKey]
                    .toLowerCase();
            return categoryName.includes(searchValue);
        });
    renderCategories(filteredCategories);
}

/* ==========================================================
   CHANGE LANGUAGE
========================================================== */
function handleLanguageChange(language) {

    currentLanguage = language;

    localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        language
    );

    loadLanguage();
}

/* ==========================================================
   SHOW LOADING SKELETON
   ----------------------------------------------------------
   Clone Skeleton Template
========================================================== */
function loadSkeleton() {
    elements.skeletonContainer.innerHTML = "";
    const skeleton =
        elements.skeletonTemplate.content.cloneNode(true);
    elements.skeletonContainer.appendChild(
        skeleton
    );
}

/* ==========================================================
   REMOVE LOADING SKELETON
========================================================== */
function hideSkeleton() {
    elements.skeletonContainer.innerHTML = "";
}

/* ==========================================================
   HIDE MAIN PAGE
========================================================== */
function hidePage() {
    elements.page.hidden = true;
}

/* ==========================================================
   SHOW MAIN PAGE
========================================================== */
function showPage() {
    elements.page.hidden = false;
}

/* ==========================================================
   HANDLE PAGE LOADING
   ----------------------------------------------------------
   1. Hide Page
   2. Show Skeleton
   3. Wait
   4. Load Content
========================================================== */
function handlePageLoading() {
    hidePage();
    loadSkeleton();
    setTimeout(() => {
        hideSkeleton();
        loadLanguage();
        showPage();
    }, SKELETON_DELAY);
}

/* ==========================================================
   REGISTER PAGE EVENTS
========================================================== */
function registerEvents() {
    /* English */
    languageButtons.english?.addEventListener(
        "click",
        () => handleLanguageChange("en")
    );
    /* Dari */
    languageButtons.dari?.addEventListener(
        "click",
        () => handleLanguageChange("fa")
    );
    /* Search */
    elements.searchInput?.addEventListener(
        "input",
        handleSearch
    );
}
/* ==========================================================
   INITIALIZE PAGE
========================================================== */
function initializePage() {
    registerEvents();
    handlePageLoading();
}
initializePage();