(() => {
"use strict";

const root = document.getElementById("root");

if (!root) {
console.error("PDP root element was not found.");
return;
}

const params = new URLSearchParams(window.location.search);

const category = (params.get("category") || "")
.trim()
.toLowerCase();

const requestedId = params.get("id");

const dataPaths = {
accessories: "../acs-product/acs.data.js",
bags: "../bags-product/bags.data.js",
clothes: "../clothes-product/clothes.data.js",
shoes: "../shoes-product/shoes.data.js"
};

let currentLanguage = localStorage.getItem("sale-language") || "en";

if (!["en", "fa"].includes(currentLanguage)) {
currentLanguage = "en";
}

let products = [];
let activeProduct = null;

const t = (key) => {
const lang = window.language?.[currentLanguage] || {};
const fallback = window.language?.en || {};

return lang[key] ?? fallback[key] ?? key;
};

const text = (value) => {
if (value && typeof value === "object") {
return value[currentLanguage] ?? value.en ?? "";
}

return value ?? "";
};

const imagesFor = (product) => {
if (!product) {
return [];
}

if (Array.isArray(product.images)) {
const images = product.images.filter(Boolean);

if (images.length) {
return images;
}
}

if (product.image) {
return [product.image];
}

return [];
};

const categoryMeta = {
shoes: {
brand: {
en: "Aurelia",
fa: "آرلیا"
},
gender: {
en: "Women",
fa: "زنانه"
},
material: {
en: "Leather",
fa: "چرم"
},
colors: ["#111111", "#F3F0EA", "#B8A18A"],
colorNames: {
en: ["Black", "Ivory", "Taupe"],
fa: ["مشکی", "شیری", "تاپ"]
},
sizes: ["36", "37", "38", "39", "40", "41"]
},

bags: {
brand: {
en: "Luxora",
fa: "لوکسورا"
},
gender: {
en: "Women",
fa: "زنانه"
},
material: {
en: "Leather",
fa: "چرم"
},
colors: ["#171717", "#B49A7A", "#E8DED0"],
colorNames: {
en: ["Black", "Cognac", "Ivory"],
fa: ["مشکی", "کاراملی", "شیری"]
},
sizes: ["One Size"]
},

clothes: {
brand: {
en: "Velora",
fa: "ولورا"
},
gender: {
en: "Women",
fa: "زنانه"
},
material: {
en: "Silk Blend",
fa: "ترکیب ابریشم"
},
colors: ["#1C1C1C", "#E7DCCF", "#B98E91"],
colorNames: {
en: ["Black", "Cream", "Rose"],
fa: ["مشکی", "کرم", "رز"]
},
sizes: ["S", "M", "L", "XL"]
},

accessories: {
brand: {
en: "Oralia",
fa: "اورالیا"
},
gender: {
en: "Women",
fa: "زنانه"
},
material: {
en: "Gold-Plated Sterling Silver",
fa: "نقره استرلینگ با روکش طلا"
},
colors: ["#D4AF37", "#E5B7C2", "#F8F8F8"],
colorNames: {
en: ["Gold", "Pink", "White"],
fa: ["طلایی", "صورتی", "سفید"]
},
sizes: ["One Size"]
}
};

const meta = () => {
return categoryMeta[category] || categoryMeta.shoes;
};

const getBrand = (product) => {
return text(product?.brand) || meta().brand[currentLanguage];
};

const getGender = (product) => {
return text(product?.gender) || meta().gender[currentLanguage];
};

const getMaterial = (product) => {
return text(product?.material) || meta().material[currentLanguage];
};

const getColors = (product) => {
const names =
product?.colorNames?.[currentLanguage] ||
product?.colorNames?.en;

if (Array.isArray(names) && names.length) {
return names;
}

return meta().colorNames[currentLanguage];
};

const getColorValues = (product) => {
if (Array.isArray(product?.colors) && product.colors.length) {
return product.colors;
}

return meta().colors;
};

const getSizes = (product) => {
const sizes =
currentLanguage === "fa"
? product?.sizesFa || product?.sizes
: product?.sizes;

if (Array.isArray(sizes) && sizes.length) {
return sizes;
}

return meta().sizes;
};

const getDescription = (product) => {
return (
text(product?.description) ||
t("categoryDescriptions")?.[category] ||
t("specificationText")
);
};

const productTitle = (product) => {
return text(product?.title || product?.name);
};

const productUrl = (product) => {
return `./pdp.html?category=${encodeURIComponent(category)}&id=${encodeURIComponent(product.id)}`;
};

const categoryUrl = () => {
const urls = {
shoes: "../shoes-product/shoes.html",
bags: "../bags-product/bags.html",
clothes: "../clothes-product/clothes.html",
accessories: "../acs-product/acs.html"
};

return urls[category] || "../sale.html";
};

const icon = (name) => {
const icons = {
category:
`<img class="pdp-spec-icon" src="../../../src/assets/icons/bages.svg" alt="" aria-hidden="true">`,

gender:
`<img class="pdp-spec-icon" src="../../../src/assets/icons/gender.svg" alt="" aria-hidden="true">`,

material:
`<img class="pdp-spec-icon" src="../../../src/assets/icons/material.svg" alt="" aria-hidden="true">`,

colors:
`<img class="pdp-spec-icon" src="../../../src/assets/icons/colors.svg" alt="" aria-hidden="true">`,

sizes:
`<img class="pdp-spec-icon pdp-spec-icon--sizes" src="../../../src/assets/icons/ruler.svg" alt="" aria-hidden="true">`
};

return icons[name] || "";
};

const renderLanguageSwitcher = () => {
return `
<div class="pdp-language" role="group" aria-label="Language" style="margin-bottom:16px;">
<button
type="button"
class="language-switcher__button"
data-language-toggle
aria-label="${currentLanguage === "en" ? "Switch to Persian" : "Switch to English"}"
>
${t("languageButton")}
</button>
</div>
`;
};

const renderProductThumbnails = (product) => {
    return products
        .slice(0, 8)
        .map((item) => {
            const image = imagesFor(item)[0] || "";
            const active = String(item.id) === String(product.id);

            return `
                <button
                    type="button"
                    class="pdp-thumbnail ${active ? "active" : ""}"
                    data-product-id="${item.id}"
                    aria-label="${productTitle(item)}"
                    aria-current="${active ? "true" : "false"}"
                >
                    <img src="${image}" alt="${productTitle(item)}" loading="lazy">
                </button>
            `;
        })
        .join("");
};

const renderSpecs = (product) => {
const colors = getColors(product);
const colorValues = getColorValues(product);
const sizes = getSizes(product);

return `
<section
class="pdp-specs"
aria-labelledby="specificationsTitle"
>

<h2 id="specificationsTitle">
${t("specifications")}
</h2>

<p>
${t("specificationText")}
</p>

<div class="pdp-specs-table-wrap">

<table>

<tbody>

<tr>
<th>
${icon("category")}
${t("category")}
</th>

<td>
${t("categoryLabels")?.[category] || category}
</td>
</tr>

<tr>
<th>
${icon("gender")}
${t("gender")}
</th>

<td>
${getGender(product)}
</td>
</tr>

<tr>
<th>
${t("brand")}
</th>

<td>
${getBrand(product)}
</td>
</tr>

<tr>
<th>
${icon("material")}
${t("material")}
</th>

<td>
${getMaterial(product)}
</td>
</tr>

<tr>

<th>
${icon("colors")}
${t("colors")}
</th>

<td>

<div
class="spec-colors"
aria-label="${t("colors")}"
>

${colors
.map(
(name, index) => `
<span class="spec-color">

<span
class="color-dot"
style="background:${colorValues[index] || "#ccc"}"
title="${name}"
aria-label="${name}"
>
</span>

<span>
${name}
</span>

</span>
`
)
.join("")}

</div>

</td>

</tr>

<tr>

<th>
${icon("sizes")}
${t("sizes")}
</th>

<td>

<div
class="spec-sizes"
aria-label="${t("sizes")}"
>

${sizes
.map(
(size) => `
<span class="size-chip">
${size}
</span>
`
)
.join("")}

</div>

</td>

</tr>

</tbody>

</table>

</div>

</section>
`;
};

const render = (product) => {
activeProduct = product;

document.documentElement.lang = currentLanguage;

document.documentElement.dir =
currentLanguage === "fa" ? "rtl" : "ltr";

document.body.dir = document.documentElement.dir;

const title = productTitle(product);

const images = imagesFor(product);

const mainImage = images[0] || "";

const collection =
t("collectionLabels")?.[category] || "";

const oldPrice = text(product?.oldPrice);

const price =
text(product?.newPrice) ||
text(product?.price) ||
"—";

root.innerHTML = `

<section class="pdp-showcase">

${renderLanguageSwitcher()}

<nav
class="pdp-breadcrumb"
aria-label="Breadcrumb"
style="color:#000000; border-color:#000000; margin-top:16px;"
>

<a href="../../../index.html" style="color:#000000;">
${t("breadcrumbHome")}
</a>

<span style="color:#000000;">/</span>

<span style="color:#000000;">
${t("breadcrumbWomen")}
</span>

<span style="color:#000000;">/</span>

<a href="${categoryUrl()}" style="color:#000000;">
${t("categoryLabels")?.[category] || category}
</a>

<span style="color:#000000;">/</span>

<span style="color:#000000;">
${collection}
</span>

</nav>

<div class="pdp">

<div class="pdp-media">

<aside
class="pdp-thumbnails"
aria-label="${t("product")}"
>

${renderProductThumbnails(product)}

</aside>

<div class="pdp-main-media">

<img
id="mainImage"
src="${mainImage}"
alt="${title}"
loading="eager"
>

</div>

</div>

<div class="pdp-info">

<span class="pdp-category">
${collection}
</span>

<h1 class="pdp-title">
${title}
</h1>

<p class="pdp-subtitle">
${getDescription(product)}
</p>

<div class="pdp-price">

${
oldPrice
? `<span class="pdp-old-price number">${oldPrice}</span>`
: ""
}

<span class="pdp-current-price number">
${price}
</span>

<span class="pdp-discount">
${t("sale")}
</span>

</div>

<button
id="addToCartButton"
class="btn btn-primary pdp-add-to-cart"
type="button"
>
${t("addToCart")}
</button>

</div>

</div>

<section class="pdp-description">

<h2>
${t("description")}
</h2>

<p>
${getDescription(product)}
</p>

</section>

${renderSpecs(product)}

</section>
`;

bindEvents();
};

const showToast = (type, message) => {

let container =
document.querySelector(".toast-container");

if (!container) {

container = document.createElement("div");

container.className = "toast-container";

Object.assign(container.style, {
position: "fixed",
top: "20px",
right: "20px",
left: "auto",
bottom: "auto",
transform: "none",
zIndex: "10000",
display: "flex",
flexDirection: "column",
alignItems: "flex-end",
gap: "10px",
pointerEvents: "none"
});

document.body.appendChild(container);
}

const icons = {
success: "✓",
remove: "✓",
warning: "⚠",
error: "✕"
};

const toast = document.createElement("div");

toast.className = `toast toast-${type}`;

toast.style.pointerEvents = "auto";

toast.innerHTML = `
<span class="toast__icon">
${icons[type] || "✓"}
</span>

<span class="toast__message">
${message}
</span>
`;

container.appendChild(toast);

setTimeout(() => {

toast.style.transition = "opacity .3s ease";
toast.style.opacity = "0";

setTimeout(() => {
toast.remove();
}, 300);

}, 2500);
};

const getCart = () => {

try {

const value =
JSON.parse(
localStorage.getItem("saleCart_" + category) || "[]"
);

return Array.isArray(value) ? value : [];

} catch (error) {

console.error("Unable to read sale cart.", error);

return [];
}
};

const saveCart = (cart) => {

localStorage.setItem(
"saleCart_" + category,
JSON.stringify(cart)
);

};

const addToCart = (product) => {

if (!product) {

showToast("error", t("cartError"));

return;
}

const cart = getCart();

const found = cart.find(
(item) =>
String(item?.product?.id) === String(product.id) &&
item?.product?.category === category
);

if (found) {

found.quantity =
(Number(found.quantity) || 1) + 1;

} else {

cart.push({
product: {
...product,
category
},
quantity: 1
});

}

saveCart(cart);

showToast(
"success",
t("addedToCart")
);

showToast(
"success",
t("addedToCart")
);

};

const bindEvents = () => {

const languageButton =
document.querySelector(
"[data-language-toggle]"
);

if (languageButton) {

languageButton.addEventListener(
"click",
() => {

currentLanguage =
currentLanguage === "en"
? "fa"
: "en";

localStorage.setItem(
"sale-language",
currentLanguage
);

render(activeProduct);

}
);

}

document
.querySelectorAll("[data-product-id]")
.forEach((button) => {

button.addEventListener("click", () => {

const nextProduct = products.find(
(item) =>
String(item.id) ===
String(button.dataset.productId)
);

if (!nextProduct) return;

const url = productUrl(nextProduct);

window.history.pushState(
{
category,
id: nextProduct.id
},
"",
url
);

render(nextProduct);

});

});

document
.getElementById("addToCartButton")
?.addEventListener(
"click",
() => addToCart(activeProduct)
);

};

const loadScript = (src) => {

return new Promise((resolve, reject) => {

const script =
document.createElement("script");

script.src = src;

script.onload = resolve;

script.onerror = () => {

reject(
new Error(
`Unable to load product data: ${src}`
)
);

};

document.head.appendChild(script);

});

};

const showError = (error) => {

console.error(error);

document.documentElement.dir =
currentLanguage === "fa"
? "rtl"
: "ltr";

root.innerHTML = `

<section class="pdp-showcase">

<div class="pdp-description">

<h2>
${
currentLanguage === "fa"
? "خطا در بارگذاری"
: "Unable to load product"
}
</h2>

<p>
${
currentLanguage === "fa"
? "اطلاعات محصول قابل بارگذاری نیست."
: "Product data could not be loaded."
}
</p>

</div>

</section>
`;

};

const init = async () => {

try {

if (!dataPaths[category]) {

throw new Error(
`Unknown category: ${category}`
);

}

if (!window.language) {

throw new Error(
"PDP translations were not loaded."
);

}

await loadScript(
dataPaths[category]
);

products =
Array.isArray(window.products)
? window.products
: [];

if (!products.length) {

throw new Error(
"No products found."
);

}

const product = requestedId
? products.find(
(item) =>
String(item.id) ===
String(requestedId)
)
: products[0];

if (!product) {

throw new Error(
`Product not found: ${requestedId}`
);

}

if (!requestedId) {

window.history.replaceState(
{
category,
id: product.id
},
"",
productUrl(product)
);

}

render(product);

} catch (error) {

showError(error);

}

};

window.addEventListener(
"popstate",
() => {

const id =
new URLSearchParams(
window.location.search
).get("id");

const next =
products.find(
(product) =>
String(product.id) ===
String(id)
);

if (next) {
render(next);
}

}
);

init();

})();