// ========================================
// NAIL COLLECTION PREVIEW
// ========================================

import { nailCollectionProducts } from './nail-collection-data.js';
import { nailCollectionTranslations } from './nail-collection-i18n.js';


// ========================================
// SHARED LANGUAGE
// ========================================

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';

let currentLanguage =
  localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

let searchQuery = '';
let filteredProducts = [...nailCollectionProducts];

const rootContainer = document.getElementById('nail-collection-root');

// ========================================
// GET CURRENT TRANSLATIONS
// ========================================
function getCurrentTranslations() {
  return nailCollectionTranslations[currentLanguage] || nailCollectionTranslations.en;
}

// ========================================
// UPDATE DOCUMENT LANGUAGE
// ========================================
function updateDocumentLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';

  document.body.classList.toggle(
    'rtl',
    currentLanguage === 'fa'
  );

  document.title = getCurrentTranslations().pageTitle;
}

// ========================================
// NORMALIZE SEARCH TEXT
// ========================================
function normalizeSearchText(value) {
  return String(value || '')
    .toLocaleLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ى/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ۀ/g, 'ه')
    .replace(/ة/g, 'ه')
    .replace(/\u200c/g, ' ')
    .replace(/\u200b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ========================================
// CONVERT NUMBER TO PERSIAN/DARI NUMBER
// ========================================
function toPersianNumber(value) {
  const persianNumbers = [
    '۰',
    '۱',
    '۲',
    '۳',
    '۴',
    '۵',
    '۶',
    '۷',
    '۸',
    '۹'
  ];

  return String(value)
    .split('')
    .map(digit => {
      const number = parseInt(digit, 10);

      if (Number.isNaN(number)) {
        return digit;
      }

      return persianNumbers[number];
    })
    .join('');
}

// ========================================
// FILTER PRODUCTS
// ========================================
function filterProducts() {
  const query = normalizeSearchText(searchQuery);


  if (!query) {
    filteredProducts = [...nailCollectionProducts];
    return;
  }

  filteredProducts = nailCollectionProducts.filter(product => {
    const englishProductName =
      nailCollectionTranslations.en?.productNames?.[product.title] ||
      product.title;

    const dariProductName =
      nailCollectionTranslations.fa?.productNames?.[product.title] ||
      product.title;

    const specificationValues = product.specifications
      ? Object.values(product.specifications)
      : [];

    const searchableValues = [
      product.title,
      englishProductName,
      dariProductName,
      product.category,
      product.subCategory,
      product.collection,
      product.shortDescription,
      product.description,
      ...specificationValues
    ];

    const searchableText = searchableValues
      .filter(value => value !== undefined && value !== null)
      .map(value => normalizeSearchText(value))
      .join(' ');

    return searchableText.includes(query);
  });
}

// ========================================
// RENDER BREADCRUMB
// ========================================
function renderBreadcrumb() {
  const t = getCurrentTranslations();

  return `
    <nav class="breadcrumb">
      <a href="../../../../index.html">${t.breadcrumbHome}</a>
      <span>/</span>
      <a href="#">${t.breadcrumbBeauty}</a>
      <span>/</span>
      <span>${t.breadcrumbNail}</span>
    </nav>
  `;
}

// ========================================
// RENDER HERO
// ========================================
function renderHero() {
  const t = getCurrentTranslations();

  return `
    <section class="plp-hero">
      <div class="plp-hero__content">
        <h1 class="plp-hero__title">${t.heroTitle}</h1>
        <p class="plp-hero__description">${t.heroDescription}</p>
      </div>

      <div class="plp__media">
        <img 
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&h=500&fit=crop&q=80" 
          alt="${t.heroTitle}"
          onerror="this.src='https://via.placeholder.com/1200x500/F6F0F4/6F4E63?text=Nail+Collection'"
        >
      </div>
    </section>
  `;
}

// ========================================
// RENDER SEARCH BOX
// ========================================
function renderSearchBox() {
  const t = getCurrentTranslations();

  return `
    <div class="search-box" style="margin: 32px 0; max-width: 100%;">
      <svg class="search-box__icon" viewBox="0 0 24 24">
        <path 
          d="M10 18a8 8 0 1 1 5.292-14.002A8 8 0 0 1 10 18zm11 3-6-6" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round"
        />
      </svg>

      <input 
        type="search" 
        class="search-box__input" 
        placeholder="${t.searchPlaceholder}" 
        value="${searchQuery}" 
        id="searchInput"
        autocomplete="off"
        aria-label="${t.searchPlaceholder}"
      >
    </div>
  `;
}

// ========================================
// RENDER PRODUCT CARD
// ========================================
function renderProductCard(product) {
  const t = getCurrentTranslations();

  const translatedTitle =
    t.productNames?.[product.title] || product.title;

  const stockNumber = currentLanguage === 'fa'
    ? toPersianNumber(product.stock)
    : product.stock;

  const stockDisplay = `${t.stockLabel}: ${stockNumber}`;

  const productLink = product.link

  const stockColor =
    product.stock > 50
      ? '#10b981'
      : product.stock > 20
        ? '#f59e0b'
        : '#ef4444';

  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://via.placeholder.com/500x500/F6F0F4/6F4E63?text=Nail+Product';

  return `
    <a href="${productLink}" class="plp-category-card">
      <img 
        src="${productImage}" 
        alt="${translatedTitle}" 
        loading="lazy" 
        onerror="this.src='https://via.placeholder.com/500x500/F6F0F4/6F4E63?text=${encodeURIComponent(translatedTitle)}'"
      >

      <div class="plp-category-card__body">
        <h3>${translatedTitle}</h3>

        <span 
          style="
            color: ${stockColor};
            font-weight: 600;
          "
        >
          ${stockDisplay}
        </span>
      </div>
    </a>
  `;
}

// ========================================
// RENDER PRODUCT GRID
// ========================================
function renderProductGrid() {
  const t = getCurrentTranslations();

  if (filteredProducts.length === 0) {
    return `
      <div class="empty-results">
        <p>${t.emptyMessage}</p>
      </div>
    `;
  }

  return `
    <div class="plp-category-grid">
      ${filteredProducts.map(renderProductCard).join('')}
    </div>
  `;
}

// ========================================
// RENDER LANGUAGE BUTTONS
// ========================================
function renderLanguageButtons() {
  const t = getCurrentTranslations();

  return `
    <div class="lang-bar">
      <button 
        type="button"
        class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" 
        data-lang="en"
      >
        ${t.langButtonEn}
      </button>

      <button 
        type="button"
        class="lang-btn ${currentLanguage === 'fa' ? 'active' : ''}" 
        data-lang="fa"
      >
        ${t.langButtonFa}
      </button>
    </div>
  `;
}

// ========================================
// RENDER ONLY PRODUCT RESULTS
// ========================================
function renderOnlyProductResults() {
  const resultsContainer = document.getElementById('product-results');

  if (!resultsContainer) {
    return;
  }

  resultsContainer.innerHTML = renderProductGrid();
}

// ========================================
// RENDER PAGE
// ========================================
function renderPage() {
  rootContainer.innerHTML = `
    <section class="ui-section">
      <div class="container">
        <h2 class="ui-section-title">PLP Type A — Nail Collection</h2>

        ${renderBreadcrumb()}
        ${renderHero()}
        ${renderSearchBox()}

        <div id="product-results">
          ${renderProductGrid()}
        </div>

        ${renderLanguageButtons()}
      </div>
    </section>
  `;

  updateDocumentLanguage();
  attachEvents();
}

// ========================================
// HANDLE SEARCH
// ========================================
function handleSearch(event) {
  searchQuery = event.target.value;

  filterProducts();

  renderOnlyProductResults();
}

// ========================================
// HANDLE LANGUAGE CHANGE
// ========================================
function handleLanguageChange(event) {
  const newLanguage = event.currentTarget.dataset.lang;

  if (!newLanguage || newLanguage === currentLanguage) {
    return;
  }

  currentLanguage = newLanguage;

  localStorage.setItem(
    LANGUAGE_STORAGE_KEY,
    currentLanguage
  );


  filterProducts();
  renderPage();
}

// ========================================
// SYNC LANGUAGE WITH OTHER PAGES
// ========================================

window.addEventListener('storage', event => {
  if (event.key !== LANGUAGE_STORAGE_KEY) {
    return;
  }

  const newLanguage =
    event.newValue === 'fa'
      ? 'fa'
      : 'en';

  if (newLanguage === currentLanguage) {
    return;
  }

  currentLanguage = newLanguage;

  filterProducts();
  renderPage();
});

// ========================================
// ATTACH EVENTS
// ========================================
function attachEvents() {
  const searchInput = document.getElementById('searchInput');

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', handleLanguageChange);
  });
}

// ========================================
// INIT
// ========================================
function init() {
  console.log('🚀 Nail Collection - Initializing...');

  if (!rootContainer) {
    console.error('❌ Root container not found!');
    return;
  }


  currentLanguage =
    localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

  filterProducts();
  renderPage();

  console.log('✅ Loaded successfully!');
  console.log('📦 Total products:', nailCollectionProducts.length);
}

// ========================================
// START
// ========================================
init();
