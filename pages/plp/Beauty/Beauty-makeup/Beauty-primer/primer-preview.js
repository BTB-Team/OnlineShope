// primer-preview.js
// Preview logic for Primer Collection with Shopping Cart

import { primerProducts } from './primer-data.js';
import { primerTranslations } from './primer-i18n.js';

// ==================== STATE ====================
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
let searchQuery = '';
let filteredProducts = [...primerProducts];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ==================== DOM ====================
const rootContainer = document.getElementById('beauty-primer-root');
const cartOverlay = document.querySelector('.cart-overlay');
const cartDrawer = document.querySelector('.cart-drawer');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');

// ==================== HELPERS ====================
function getCurrentTranslations() {
  return primerTranslations[currentLanguage];
}

function updateDocumentLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', currentLanguage === 'fa');
  document.title = getCurrentTranslations().pageTitle;
}

function toPersianNumber(num) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[digit]);
}

function filterProducts() {
  const query =
    String(searchQuery || '')
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

  if (!query) {
    filteredProducts = [
      ...primerProducts
    ];

    return;
  }

  const translations =
    primerTranslations[currentLanguage] ||
    primerTranslations.en;

  filteredProducts =
    primerProducts.filter(product => {
      const searchableValues = [
        product.title,
        product.collection,
        product.category,
        product.subCategory,
        product.shortDescription,
        product.description,
        product.badge,

        translations[product.title],
        translations[product.collection],
        translations[product.category],
        translations[product.subCategory],
        translations[product.shortDescription],
        translations[product.description],
        translations[product.badge?.toLowerCase()]
      ];

      const searchableText =
        searchableValues
          .filter(
            value =>
              value !== undefined &&
              value !== null
          )
          .map(value =>
            String(value)
              .toLocaleLowerCase()
              .replace(/ي/g, 'ی')
              .replace(/ى/g, 'ی')
              .replace(/ك/g, 'ک')
              .replace(/ۀ/g, 'ه')
              .replace(/ة/g, 'ه')
              .replace(/\u200c/g, ' ')
              .replace(/\u200b/g, '')
              .replace(/\s+/g, ' ')
              .trim()
          )
          .join(' ');

      return searchableText.includes(query);
    });
}


// ==================== TOAST ====================
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  toastContainer.style.cssText = 'position:fixed;top:24px;display:flex;flex-direction:column;gap:12px;z-index:9999;';
  
  if (currentLanguage === 'fa') {
    toastContainer.style.left = '24px';
    toastContainer.style.right = 'auto';
  } else {
    toastContainer.style.right = '24px';
    toastContainer.style.left = 'auto';
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `
    <span class="toast__icon">✓</span>
    <span class="toast__message">${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function showToastRemove(message) {
  let toastContainer = document.getElementById('toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  toastContainer.style.cssText = 'position:fixed;top:24px;display:flex;flex-direction:column;gap:12px;z-index:9999;';
  
  if (currentLanguage === 'fa') {
    toastContainer.style.left = '24px';
    toastContainer.style.right = 'auto';
  } else {
    toastContainer.style.right = '24px';
    toastContainer.style.left = 'auto';
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast toast-remove';
  toast.innerHTML = `
    <span class="toast__icon">✓</span>
    <span class="toast__message">${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ==================== CART FUNCTIONS ====================
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  const t = getCurrentTranslations();
  showToast(t.addedToCart);
  updateCartBadge();
}

function removeFromCart(productId) {
  const removedProduct = cart.find(item => item.id === productId);
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  updateCartBadge();
  
  if (removedProduct) {
    const t = getCurrentTranslations();
    const message = t.removedFromCart || (currentLanguage === 'fa' ? 'محصول از سبد خرید حذف شد' : 'Product removed from cart');
    showToastRemove(message);
  }
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      renderCart();
    }
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function calculateTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = currentLanguage === 'fa' ? toPersianNumber(totalItems) : totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

function openCart() {
  renderCart();
  
  if (currentLanguage === 'fa') {
    cartDrawer.style.right = 'auto';
    cartDrawer.style.left = '0';
  } else {
    cartDrawer.style.left = 'auto';
    cartDrawer.style.right = '0';
  }
  
  cartOverlay.style.display = 'block';
  cartDrawer.style.display = 'flex';
}

function closeCart() {
  cartOverlay.style.display = 'none';
  cartDrawer.style.display = 'none';
}

function renderCart() {
  const t = getCurrentTranslations();
  const isFarsi = currentLanguage === 'fa';
  
  document.querySelector('.cart-title').textContent = isFarsi ? 'سبد خرید شما' : 'Your Cart';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--color-text-muted);">
        ${isFarsi ? 'سبد خرید شما خالی است' : 'Your cart is empty'}
      </div>
    `;
    cartTotalPrice.textContent = isFarsi ? '۰ افغانی' : 'Af 0';
    return;
  }
  
  cartItemsContainer.innerHTML = cart.map(item => {
    const translatedTitle = t[item.title] || item.title;
    const translatedCategory = t[item.subCategory] || item.subCategory;
    const displayPrice = isFarsi ? toPersianNumber(item.price) : item.price;
    const displayQuantity = isFarsi ? toPersianNumber(item.quantity) : item.quantity;
    
    return `
      <div class="cart-item">
        <img class="cart-item__image" src="${item.images[0]}" alt="${translatedTitle}">
        <div class="cart-item__content">
          <h3 class="cart-item__title">${translatedTitle}</h3>
          <p class="cart-item__category">${translatedCategory}</p>
          <span class="cart-item__price number">${isFarsi ? `${displayPrice} ${t.currency}` : `${t.currency} ${item.price}`}</span>
        </div>
        <div class="cart-item__actions">
          <div class="cart-qty">
            <button class="number" data-action="decrease" data-id="${item.id}">-</button>
            <span class="number">${displayQuantity}</span>
            <button class="number" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <button class="cart-remove" data-action="remove" data-id="${item.id}">${isFarsi ? 'حذف' : 'Remove'}</button>
        </div>
      </div>
    `;
  }).join('');
  
  const total = calculateTotal();
  const displayTotal = isFarsi ? toPersianNumber(total) : total;
  cartTotalPrice.textContent = isFarsi ? `${displayTotal} ${t.currency}` : `${t.currency} ${total}`;
  
  document.querySelector('.cart-checkout').textContent = isFarsi ? 'ارسال سفارش از طریق واتساپ' : 'Checkout via WhatsApp';
  
  attachCartEvents();
}

function attachCartEvents() {
  document.querySelectorAll('[data-action="increase"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      updateQuantity(id, 1);
    });
  });
  
  document.querySelectorAll('[data-action="decrease"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      updateQuantity(id, -1);
    });
  });
  
  document.querySelectorAll('[data-action="remove"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id);
      removeFromCart(id);
    });
  });
}

function handleWhatsAppCheckout() {
  if (cart.length === 0) {
    alert(currentLanguage === 'fa' ? 'سبد خرید شما خالی است!' : 'Your cart is empty!');
    return;
  }
  
  const t = getCurrentTranslations();
  let message = currentLanguage === 'fa' ? 'سلام، می‌خواهم این محصولات را سفارش دهم:\n\n' : 'Hello, I would like to order:\n\n';
  
  cart.forEach(item => {
    const title = t[item.title] || item.title;
    message += `${item.quantity}x ${title} - ${item.price} ${t.currency}\n`;
  });
  
  const total = calculateTotal();
  message += `\n${currentLanguage === 'fa' ? 'مجموع' : 'Total'}: ${total} ${t.currency}`;
  
  const whatsappNumber = '93787708642';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappURL, '_blank');
}

// ==================== RENDER FUNCTIONS ====================
function renderBreadcrumb() {
  const t = getCurrentTranslations();
  return `
    <nav class="breadcrumb">
      <a href="../../../../../index.html">${t.breadcrumbHome}</a>
      <span>/</span>
      <a href="#">${t.breadcrumbBeauty}</a>
      <span>/</span>
      <a href="#">${t.breadcrumbMakeup}</a>
      <span>/</span>
      <span>${t.breadcrumbPrimer}</span>
    </nav>
  `;
}

function renderHeader() {
  const t = getCurrentTranslations();
  const isFarsi = currentLanguage === 'fa';
  const productCount = isFarsi ? toPersianNumber(filteredProducts.length) : filteredProducts.length;
  
  return `
    <header class="plp-header">
      <p class="plp-header__description">${t.heroEyebrow}</p>
      <h1 class="plp-header__title">${t.heroTitle}</h1>
      <p class="plp-header__description">${t.heroSubtitle}</p>
      <p class="plp-header__count">${productCount} ${t.productCount}</p>
    </header>
  `;
}

function renderSearchBox() {
  const t = getCurrentTranslations();
  return `
    <div class="search-box" style="max-width:100%;width:100%;">
      <svg class="search-box__icon" viewBox="0 0 24 24">
        <path d="M10 18a8 8 0 1 1 5.292-14.002A8 8 0 0 1 10 18zm11 3-6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input type="search" class="search-box__input" placeholder="${t.searchPlaceholder}" value="${searchQuery}" id="searchInput">
    </div>
  `;
}

function renderProductCard(product) {
  const t = getCurrentTranslations();
  const isFarsi = currentLanguage === 'fa';
  
  const translatedTitle = t[product.title] || product.title;
  const translatedDescription = t[product.shortDescription] || product.shortDescription;
  const translatedBadge = t[product.badge.toLowerCase()] || product.badge;
  
  const displayPrice = isFarsi ? toPersianNumber(product.price) : product.price;
  const displayOldPrice = isFarsi ? toPersianNumber(product.oldPrice) : product.oldPrice;
  
  const priceText = isFarsi 
    ? `${displayPrice} ${t.currency}` 
    : `${t.currency} ${product.price}`;
  
  const oldPriceText = isFarsi 
    ? `${displayOldPrice} ${t.currency}` 
    : `${t.currency} ${product.oldPrice}`;
  
  const badgePosition = isFarsi ? 'right: 12px;' : 'left: 12px;';
  const cartPosition = isFarsi ? 'left: 12px;' : 'right: 12px;';
  
  return `
    <article class="product-card">
      <div class="product-card__media">
        <span style="position: absolute; top: 12px; ${badgePosition} background: #F4D8C5; color: #6B4F3B; padding: 6px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; z-index: 2; font-family: var(--font-body-fa);">${translatedBadge}</span>
        
        <button class="add-to-cart-btn" data-id="${product.id}" aria-label="${t.addToCart}" style="position: absolute; top: 12px; ${cartPosition} width: 42px; height: 42px; border: none; border-radius: 50%; background: #A77A95; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: var(--transition-normal); z-index: 2; display: flex; align-items: center; justify-content: center;">
          <svg height="24px" width="24px" viewBox="0 0 512 512" fill="#ffffff">
            <path d="M456.169,230.305c-31.675-12.846-55.203-36.078-78.763-73.623c-27.405-43.677-29.413-80.099-41.628-104.848 C322.908,25.733,293.11,0,256.13,0c-36.971,0-66.778,25.733-79.648,51.834c-12.214,24.749-14.231,68.025-34.774,110.833 c-19.183,39.971-56.507,59.941-85.617,67.638c-25.396,6.73-17.854,28.864-17.854,28.864l22.338,161.51 C67.814,473.028,112.557,512,165.399,512h181.463c52.842,0,97.584-38.972,104.832-91.322l22.33-161.51 C474.024,259.169,480.516,240.182,456.169,230.305z M311.981,181.635c0,17.748-4.476,34.168-7.829,40.972 c-7.672,15.543-25.97,22.264-48.022,22.264c-22.051,0-40.348-6.722-48.022-22.264c-3.344-6.804-7.829-23.224-7.829-40.972v-56.416 c0-17.74,4.484-34.168,7.829-40.955c7.673-15.55,25.97-32.282,48.022-32.282c22.052,0,40.349,16.732,48.022,32.282 c3.353,6.788,7.829,23.216,7.829,40.955V181.635z"/>
          </svg>
        </button>
        
        <img src="${product.images[0]}" alt="${translatedTitle}" class="product-card__image" loading="lazy">
      </div>
      <div class="product-card__content">
        <h3 class="product-card__title">${translatedTitle}</h3>
        <div class="product-card__price">
          <span class="product-card__old-price number">${oldPriceText}</span>
          <span class="product-card__new-price number">${priceText}</span>
        </div>
        <div class="product-card__details">
         <a href="../../../../../pages/pdp/pdp.html?id=${product.id}"> ${t.viewDetails} →</a>
      </div>
    </article>
  `;
}

function renderProducts() {
  const cards = filteredProducts.map(product => renderProductCard(product)).join('');
  return `
    <section class="product-grid">
      ${cards}
    </section>
  `;
}

function renderLanguageButtons() {
  const t = getCurrentTranslations();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayBadge = currentLanguage === 'fa' ? toPersianNumber(totalItems) : totalItems;
  
  return `
    <div class="lang-bar" style="margin:40px 0;display:flex;gap:12px;justify-content:center;align-items:center;">
      <button class="lang-btn ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en" style="padding:8px 24px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:${currentLanguage === 'en' ? 'var(--color-mauve-dusty)' : 'transparent'};color:${currentLanguage === 'en' ? '#fff' : 'var(--color-text-primary)'};cursor:pointer;font-family:var(--font-body-en);">${t.langButtonEn}</button>
      
      <button class="lang-btn ${currentLanguage === 'fa' ? 'active' : ''}" data-lang="fa" style="padding:8px 24px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:${currentLanguage === 'fa' ? 'var(--color-mauve-dusty)' : 'transparent'};color:${currentLanguage === 'fa' ? '#fff' : 'var(--color-text-primary)'};cursor:pointer;font-family:var(--font-fa);">${t.langButtonFa}</button>
      
      <button id="cart-icon-btn" style="position:relative;width:48px;height:48px;border:none;border-radius:50%;background:var(--color-mauve-dusty);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;">
        <svg height="24px" width="24px" viewBox="0 0 512 512" fill="#ffffff">
          <path d="M456.169,230.305c-31.675-12.846-55.203-36.078-78.763-73.623c-27.405-43.677-29.413-80.099-41.628-104.848 C322.908,25.733,293.11,0,256.13,0c-36.971,0-66.778,25.733-79.648,51.834c-12.214,24.749-14.231,68.025-34.774,110.833 c-19.183,39.971-56.507,59.941-85.617,67.638c-25.396,6.73-17.854,28.864-17.854,28.864l22.338,161.51 C67.814,473.028,112.557,512,165.399,512h181.463c52.842,0,97.584-38.972,104.832-91.322l22.33-161.51 C474.024,259.169,480.516,240.182,456.169,230.305z M311.981,181.635c0,17.748-4.476,34.168-7.829,40.972 c-7.672,15.543-25.97,22.264-48.022,22.264c-22.051,0-40.348-6.722-48.022-22.264c-3.344-6.804-7.829-23.224-7.829-40.972v-56.416 c0-17.74,4.484-34.168,7.829-40.955c7.673-15.55,25.97-32.282,48.022-32.282c22.052,0,40.349,16.732,48.022,32.282 c3.353,6.788,7.829,23.216,7.829,40.955V181.635z"/>
        </svg>
        <span id="cart-badge" style="position:absolute;top:-4px;right:-4px;background:#C75B5B;color:#fff;border-radius:50%;width:20px;height:20px;display:${totalItems > 0 ? 'flex' : 'none'};align-items:center;justify-content:center;font-size:11px;font-weight:700;">${displayBadge}</span>
      </button>
    </div>
  `;
}

function renderPage() {
  rootContainer.innerHTML = `
    ${renderBreadcrumb()}
    ${renderHeader()}
    ${renderSearchBox()}
    ${renderProducts()}
    ${renderLanguageButtons()}
  `;
  
  updateDocumentLanguage();
  attachEvents();
}

// ==================== EVENTS ====================
function handleSearch(event) {
  searchQuery =
    event.target.value;

  filterProducts();

  renderPage();

  const searchInput =
    document.getElementById(
      'searchInput'
    );

  if (searchInput) {
    searchInput.focus();

    searchInput.setSelectionRange(
      searchQuery.length,
      searchQuery.length
    );
  }
}

function attachEvents() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.currentTarget.dataset.id);
      const product = primerProducts.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  });
  
  document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const newLang = e.target.dataset.lang;
      if (newLang && newLang !== currentLanguage) {
        currentLanguage = newLang;
        localStorage.setItem('selectedLanguage', currentLanguage);
        searchQuery = '';
        filterProducts();
        renderPage();
      }
    });
  });
  
  const cartIconBtn = document.getElementById('cart-icon-btn');
  if (cartIconBtn) {
    cartIconBtn.addEventListener('click', openCart);
  }
  
  const cartCloseBtn = document.querySelector('.cart-close');
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCart);
  }
  
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  const checkoutBtn = document.querySelector('.cart-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleWhatsAppCheckout);
  }
}

// ==================== INIT ====================
function init() {
  console.log('🚀 Primer PLP with Cart - Initializing...');
  
  if (!rootContainer) {
    console.error('❌ Root container #beauty-primer-root not found!');
    return;
  }
  
  filterProducts();
  renderPage();
  updateCartBadge();
  
  console.log('✅ Primer PLP with Cart rendered successfully!');
  console.log('📦 Total Products:', primerProducts.length);
  console.log('🛒 Cart Items:', cart.length);
}

init();