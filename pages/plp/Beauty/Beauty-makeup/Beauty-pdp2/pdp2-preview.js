// pdp-preview.js
// Dynamic Product Detail Page with Cart Support
// One shared PDP for Makeup + Nail

// ==================== MAKEUP ====================

// ==================== MAKEUP ====================

import { bronzeProducts as bronzerProducts } from '../Beauty-bronzer/bronzer-data.js';
import { bronzeTranslations as bronzerTranslations } from '../Beauty-bronzer/bronzer-i18n.js';

import { blushProducts } from '../Beauty-blush/blush-data.js';
import { blushTranslations } from '../Beauty-blush/blush-i18n.js';

import { primerProducts } from '../Beauty-primer/primer-data.js';
import { primerTranslations } from '../Beauty-primer/primer-i18n.js';

import { powderProducts } from '../Beauty-powder/powder-data.js';
import { powderTranslations } from '../Beauty-powder/powder-i18n.js';

import { highlighterProducts } from '../Beauty-highlighter/highlighter-data.js';
import { highlighterTranslations } from '../Beauty-highlighter/highlighter-i18n.js';

import { moisturizerProducts } from '../Beauty-moisturizer/moisturizer-data.js';
import { moisturizerTranslations } from '../Beauty-moisturizer/moisturizer-i18n.js';

import { foundationProducts } from '../Beauty-foundation/foundation-data.js';
import { foundationTranslations } from '../Beauty-foundation/foundation-i18n.js';

import { concealerProducts } from '../Beauty-concealer/concealer-data.js';
import { concealerTranslations } from '../Beauty-concealer/concealer-i18n.js';

// ==================== NAIL ====================

import { nailArtProducts } from '../../Beauty-nail/nail-art/nail-art-data.js';
import { nailArtTranslations } from '../../Beauty-nail/nail-art/nail-art-i18n.js';

import { nailCareProducts } from '../../Beauty-nail/nail-care/nail-care-data.js';
import { nailCareTranslations } from '../../Beauty-nail/nail-care/nail-care-i18n.js';

import { nailEquipmentProducts } from '../../Beauty-nail/nail-equipment/nail-equipment-data.js';
import { nailEquipmentTranslations } from '../../Beauty-nail/nail-equipment/nail-equipment-i18n.js';

import { nailExtensionProducts } from '../../Beauty-nail/nail-extension/nail-extension-data.js';
import { nailExtensionTranslations } from '../../Beauty-nail/nail-extension/nail-extension-i18n.js';

import { nailPolishProducts } from '../../Beauty-nail/nail-polish/nail-polish-data.js';
import { nailPolishTranslations } from '../../Beauty-nail/nail-polish/nail-polish-i18n.js';

import { nailPrepProducts } from '../../Beauty-nail/nail-prep/nail-prep-data.js';
import { nailPrepTranslations } from '../../Beauty-nail/nail-prep/nail-prep-i18n.js';

import { nailToolsProducts } from '../../Beauty-nail/nail-tools/nail-tools-data.js';
import { nailToolsTranslations } from '../../Beauty-nail/nail-tools/nail-tools-i18n.js';

// Shared PDP translations
import { pdpTranslations } from './pdp2-i18n.js';

// ==================== STATE ====================
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';
let currentProduct = null;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ==================== DATA ====================
const ALL_PRODUCTS = [
  ...bronzerProducts,
  ...blushProducts,
  ...primerProducts,
  ...powderProducts,
  ...highlighterProducts,
  ...moisturizerProducts,
  ...foundationProducts,
  ...concealerProducts,
  ...nailArtProducts,
  ...nailCareProducts,
  ...nailEquipmentProducts,
  ...nailExtensionProducts,
  ...nailPolishProducts,
  ...nailPrepProducts,
  ...nailToolsProducts
];

const ALL_TRANSLATIONS = {
  en: {
    ...pdpTranslations.en,
    ...bronzerTranslations.en,
    ...blushTranslations.en,
    ...primerTranslations.en,
    ...powderTranslations.en,
    ...highlighterTranslations.en,
    ...moisturizerTranslations.en,
    ...foundationTranslations.en,
    ...concealerTranslations.en,
    ...nailArtTranslations.en,
    ...nailCareTranslations.en,
    ...nailEquipmentTranslations.en,
    ...nailExtensionTranslations.en,
    ...nailPolishTranslations.en,
    ...nailPrepTranslations.en,
    ...nailToolsTranslations.en
  },
  fa: {
    ...pdpTranslations.fa,
    ...bronzerTranslations.fa,
    ...blushTranslations.fa,
    ...primerTranslations.fa,
    ...powderTranslations.fa,
    ...highlighterTranslations.fa,
    ...moisturizerTranslations.fa,
    ...foundationTranslations.fa,
    ...concealerTranslations.fa,
    ...nailArtTranslations.fa,
    ...nailCareTranslations.fa,
    ...nailEquipmentTranslations.fa,
    ...nailExtensionTranslations.fa,
    ...nailPolishTranslations.fa,
    ...nailPrepTranslations.fa,
    ...nailToolsTranslations.fa
  }
};

// ==================== ICONS ====================
const SPEC_ICONS = {
  category: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" fill="#A77A95"/><rect x="14" y="3" width="7" height="7" fill="#A77A95"/><rect x="14" y="14" width="7" height="7" fill="#A77A95"/><rect x="3" y="14" width="7" height="7" fill="#A77A95"/></svg>',
  subcategory: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" fill="#A77A95"/></svg>',
  type: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" fill="#A77A95"/><path d="M7.25 13.5L3.5 17.25c-.39.39-.39 1.02 0 1.41l1.34 1.34c.39.39 1.02.39 1.41 0l3.75-3.75-2.75-2.75z" fill="#A77A95"/></svg>',
  finish: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#A77A95"/></svg>',
  skinType: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#A77A95"/></svg>',
  volume: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" fill="#A77A95"/></svg>',
  shades: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#A77A95"/></svg>',
  benefits: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.21-.64-1.67-.08-.09-.13-.21-.13-.33 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#A77A95"/></svg>',
  colors: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" fill="#A77A95"/><circle cx="16" cy="8" r="3" fill="#C75B5B"/><circle cx="8" cy="16" r="3" fill="#F4D8C5"/><circle cx="16" cy="16" r="3" fill="#6B4F3B"/></svg>',
  types: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="4" rx="2" fill="#A77A95"/><rect x="3" y="10" width="14" height="4" rx="2" fill="#C75B5B"/><rect x="3" y="16" width="10" height="4" rx="2" fill="#F4D8C5"/></svg>'
};

// ==================== HELPERS ====================
const t = () => ALL_TRANSLATIONS[currentLanguage] || pdpTranslations.en;

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  console.log('📦 Product ID:', id);
  return id ? parseInt(id) : null;
}

function findProductById(id) {
  return ALL_PRODUCTS.find(p => p.id === id);
}

function toPersianNumber(num) {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, d => persianDigits[d]);
}

function updateDocumentLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'fa' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', currentLanguage === 'fa');
  document.title = t().pageTitle || 'Product Details - Laxura';
}

function renderSpecValue(value, trans) {
  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
    return `
      <div class="spec-colors">
        ${value.map(item => {
          const color = item.color || '#ccc';
          const name = item.name || color;
          const border =
            color === '#FFF5EE' ||
            color === '#FFFFF0' ||
            color === '#F5F5F5' ||
            color === '#F5F5DC' ||
            color === '#fff' ||
            color === '#ffffff'
              ? 'border:1px solid #ddd;'
              : '';
          return `<span class="color-dot" title="${trans[name] || name}" style="background:${color};${border}"></span>`;
        }).join('')}
      </div>
    `;
  }

  if (Array.isArray(value)) {
    return value.map(item => trans[item] || item).join(', ');
  }

  return trans[value] || value;
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
  setTimeout(() => toast.remove(), 3000);
}

// ==================== CART ====================
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showToast(t().addedToCart || 'Added to cart');
}

// ==================== RENDER ====================
function renderPDP() {
  const root = document.getElementById('pdp-root');

  if (!root) {
    console.error('❌ Root not found!');
    return;
  }

  if (!currentProduct) {
    const trans = t();
    const allIds = ALL_PRODUCTS.map(p => p.id).join(', ');

    root.innerHTML = `
      <div style="text-align:center;padding:80px 20px;">
        <h1 style="font-size:36px;margin-bottom:20px;">${trans.productNotFound || 'Product not found'}</h1>
        <p style="font-size:14px;color:#999;margin-top:20px;">${trans.availableIds || 'Available IDs'}: ${allIds}</p>
        <p style="font-size:14px;color:#999;margin-top:20px;">${trans.tryThese || 'Try these links'}:</p>
        <div style="margin-top:20px;">
          ${ALL_PRODUCTS.slice(0, 8).map(p =>
            `<a href="?id=${p.id}" style="display:inline-block;margin:5px;padding:10px 20px;background:#A77A95;color:#fff;border-radius:8px;text-decoration:none;">${p.title} (${p.id})</a>`
          ).join('')}
        </div>
        <div style="margin-top:40px;">
          <button class="lang-btn" data-lang="en" style="padding:10px 30px;margin:5px;cursor:pointer;border:2px solid #000;border-radius:8px;background:${currentLanguage === 'en' ? '#000' : '#fff'};color:${currentLanguage === 'en' ? '#fff' : '#000'};">${trans.langButtonEn || 'English'}</button>
          <button class="lang-btn" data-lang="fa" style="padding:10px 30px;margin:5px;cursor:pointer;border:2px solid #000;border-radius:8px;background:${currentLanguage === 'fa' ? '#000' : '#fff'};color:${currentLanguage === 'fa' ? '#fff' : '#000'};">${trans.langButtonFa || 'دری'}</button>
        </div>
      </div>
    `;

    attachLanguageEvents();
    return;
  }

  const trans = t();
  const isFarsi = currentLanguage === 'fa';

  const title = trans[currentProduct.title] || currentProduct.title || '';
  const shortDesc = trans[currentProduct.shortDescription] || currentProduct.shortDescription || '';
  const longDesc = trans[currentProduct.description] || currentProduct.description || '';
  const collection = trans[currentProduct.collection] || currentProduct.collection || '';

  const price = isFarsi ? toPersianNumber(currentProduct.price) : currentProduct.price;
  const oldPrice = isFarsi ? toPersianNumber(currentProduct.oldPrice) : currentProduct.oldPrice;
  const discount = currentProduct.oldPrice
    ? Math.round(((currentProduct.oldPrice - currentProduct.price) / currentProduct.oldPrice) * 100)
    : 0;

  const priceText = isFarsi ? `${price} ${trans.currency || ''}` : `${trans.currency || ''} ${price}`;
  const oldPriceText = isFarsi ? `${oldPrice} ${trans.currency || ''}` : `${trans.currency || ''} ${oldPrice}`;

  const images = Array.isArray(currentProduct.images) ? currentProduct.images : [];

  let specsHTML = '';
  if (currentProduct.specifications && typeof currentProduct.specifications === 'object') {
    const tableDir = isFarsi ? 'rtl' : 'ltr';
    const textAlign = isFarsi ? 'right' : 'left';

    const specRows = Object.entries(currentProduct.specifications).map(([key, value]) => {
      const label = trans[key] || key;
      const icon = SPEC_ICONS[key] || SPEC_ICONS.category;
      const renderedValue = renderSpecValue(value, trans);

      return `
        <tr>
          <th style="text-align:${textAlign};">
            ${icon}
            ${label}
          </th>
          <td style="text-align:${textAlign};">
            ${renderedValue}
          </td>
        </tr>
      `;
    }).join('');

    specsHTML = `
      <section class="pdp-specs">
        <h2 style="text-align:${textAlign};">${trans.specificationsTitle || 'Specifications'}</h2>
        <table style="direction:${tableDir};">
          ${specRows}
        </table>
      </section>
    `;
  }

  root.innerHTML = `
    <section class="pdp-showcase">
      <nav class="breadcrumb">
        <a href="../../index.html">${trans.breadcrumbHome || 'Home'}</a>
        <span>/</span>
        <span>${title}</span>
      </nav>

      <div class="pdp">
        <div class="pdp-media">
          <div class="pdp-thumbnails">
            ${
              images.length
                ? images.map((img, i) => `
                  <img src="${img}" data-index="${i}" class="${i === 0 ? 'active' : ''}" alt="Thumbnail">
                `).join('')
                : `<div style="padding:20px;color:#999;">No image available</div>`
            }
          </div>
          <div class="pdp-main-media">
            <img id="mainImage" src="${images[0] || ''}" alt="${title}">
          </div>
        </div>

        <div class="pdp-info">
          <span class="pdp-category">${collection}</span>
          <h1 class="pdp-title">${title}</h1>
          <p class="pdp-subtitle">${shortDesc}</p>
          <div class="pdp-price">
            <span class="pdp-old-price number">${oldPriceText}</span>
            <span class="pdp-current-price number">${priceText}</span>
            <span class="pdp-discount number">-${discount}%</span>
          </div>
          <button class="btn btn-primary" id="addToCartBtn">${trans.addToCart || 'Add to Cart'}</button>
        </div>
      </div>

      <section class="pdp-description">
        <h2>${trans.descriptionTitle || 'Description'}</h2>
        <p>${longDesc}</p>
      </section>

      ${specsHTML}

      <div style="margin:60px 0;text-align:center;padding:40px;background:var(--color-mauve-pale);border-radius:var(--radius-lg);">
        <button class="lang-btn" data-lang="en" style="padding:12px 40px;margin:0 10px;cursor:pointer;border:2px solid var(--color-mauve-deep);border-radius:var(--radius-md);background:${currentLanguage === 'en' ? 'var(--color-mauve-deep)' : 'transparent'};color:${currentLanguage === 'en' ? '#fff' : 'var(--color-mauve-deep)'};font-size:16px;font-weight:600;font-family:var(--font-body-en);">${trans.langButtonEn || 'English'}</button>
        <button class="lang-btn" data-lang="fa" style="padding:12px 40px;margin:0 10px;cursor:pointer;border:2px solid var(--color-mauve-deep);border-radius:var(--radius-md);background:${currentLanguage === 'fa' ? 'var(--color-mauve-deep)' : 'transparent'};color:${currentLanguage === 'fa' ? '#fff' : 'var(--color-mauve-deep)'};font-size:16px;font-weight:600;font-family:var(--font-fa);">${trans.langButtonFa || 'دری'}</button>
      </div>
    </section>
  `;

  updateDocumentLanguage();
  attachEvents();
}

// ==================== EVENTS ====================
function attachEvents() {
  document.querySelectorAll('.pdp-thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      const images = Array.isArray(currentProduct.images) ? currentProduct.images : [];
      document.getElementById('mainImage').src = images[index] || '';
      document.querySelectorAll('.pdp-thumbnails img').forEach(img => img.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  const btn = document.getElementById('addToCartBtn');
  if (btn) btn.addEventListener('click', () => addToCart(currentProduct));

  attachLanguageEvents();
}

function attachLanguageEvents() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const newLang = e.target.dataset.lang;
      if (newLang && newLang !== currentLanguage) {
        currentLanguage = newLang;
        localStorage.setItem('selectedLanguage', currentLanguage);
        renderPDP();
      }
    });
  });
}

// ==================== INIT ====================
function init() {
  try {
    console.log('🚀 PDP Init');
    console.log('📦 Total Products:', ALL_PRODUCTS.length);
    console.log('🌐 Language:', currentLanguage);

    const productId = getProductIdFromURL();
    if (productId) currentProduct = findProductById(productId);

    renderPDP();
    console.log('✅ Done');
  } catch (error) {
    console.error('PDP error:', error);
    const root = document.getElementById('pdp-root');
    if (root) {
      root.innerHTML = `
        <div style="padding:40px;color:red;text-align:center;">
          <h1>خطا در بارگذاری PDP</h1>
          <p>${error.message}</p>
        </div>
      `;
    }
  }
}

init();
