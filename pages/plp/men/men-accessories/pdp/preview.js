import{language}from"./i18n.js";
let currentLanguage=localStorage.getItem("pdpLanguage")||"en";
const root=document.getElementById("root");
const params=new URLSearchParams(window.location.search);
const brand=(params.get("brand")||"").toLowerCase().trim();
const productId=params.get("id");
const dataPaths={
"bottega-veneta":"../Bottega-Veneta/BV-data.js",
"burberry":"../Burberry/BB-data.js",
"cartier":"../Cartier/cartier-data.js",
"coach":"../Coach/coach-data.js",
"fendi":"../Fendi/fendi-data.js",
"montblanc":"../Montblanc/montblanc-data.js",
"saint-laurent":"../Saint-Laurent/YSL-data.js",
"tom-ford":"../Tom-Ford/TF-data.js"
};
const brandAliases={
"bottega veneta":"bottega-veneta",
"bv":"bottega-veneta",
"bb":"burberry",
"saint laurent":"saint-laurent",
"ysl":"saint-laurent",
"tom ford":"tom-ford",
"tf":"tom-ford"
};
const normalizedBrand=brandAliases[brand]||brand;
function setDirection(){
document.documentElement.lang=currentLanguage;
document.documentElement.dir=currentLanguage==="fa"?"rtl":"ltr";
document.body.dir=currentLanguage==="fa"?"rtl":"ltr";
}
function text(en,fa){
return currentLanguage==="fa"?(fa||en||""):(en||"");
}
const cartBrands = {
    "bottega-veneta": "bottega-veneta",
    "burberry": "burberry",
    "cartier": "cartier",
    "coach": "coach",
    "fendi": "fendi",
    "montblanc": "montblanc",
    "saint-laurent": "ysl",
    "tom-ford": "tom-ford"
};

function getCartKey(){
    const cartBrand = cartBrands[normalizedBrand];

    return `cart_${cartBrand}`;
}
function getCart(){
try{
return JSON.parse(localStorage.getItem(getCartKey())||"[]");
}catch(error){
console.error(error);
return[];
}
}
function saveCart(cart){
localStorage.setItem(getCartKey(),JSON.stringify(cart));
}
function addToCart(product,collection){
try{
const cart=getCart();
const existing=cart.find(item=>String(item.id)===String(product.id));
if(existing){
existing.quantity=(existing.quantity||1)+1;
}else{
cart.push({
id:product.id,
brand:collection.brand||normalizedBrand,
brandFa:collection.brandFa||"",
name:product.name||"",
nameFa:product.nameFa||"",
category:product.category||collection.category||"Men's Accessories",
categoryFa:product.categoryFa||collection.categoryFa||"اکسسوری زنانه",
oldPrice:product.oldPrice||"",
newPrice:product.newPrice||"",
image:product.image||(product.images&&product.images[0])||"",
quantity:1
});
}
saveCart(cart);
showSuccessToasts();
}catch(error){
console.error(error);
showErrorToast();
}
}
function setupToastContainer(){
let container=document.getElementById("toastContainer");
if(!container){
container=document.createElement("div");
container.id="toastContainer";
container.className="toast-container";
document.body.appendChild(container);
}
container.style.setProperty("position","fixed","important");
container.style.setProperty("top","24px","important");
container.style.setProperty("bottom","auto","important");
container.style.setProperty("right","24px","important");
container.style.setProperty("left","auto","important");
container.style.setProperty("z-index","99999","important");
container.style.setProperty("display","flex","important");
container.style.setProperty("flex-direction","column","important");
container.style.setProperty("gap","10px","important");
return container;
}
function showSuccessToasts(){
const lang=language[currentLanguage];
const container=setupToastContainer();
container.innerHTML="";
const toast1=document.createElement("div");
toast1.className="toast toast-success";
toast1.innerHTML=`<span class="toast__icon">✓</span><span class="toast__message">${lang.addedToCart}</span>`;
const toast2=document.createElement("div");
toast2.className="toast toast-success";
toast2.innerHTML=`<span class="toast__icon">✓</span><span class="toast__message">${lang.addedToCart}</span>`;
container.appendChild(toast1);
setTimeout(()=>container.appendChild(toast2),250);
setTimeout(()=>toast1.remove(),3000);
setTimeout(()=>toast2.remove(),3250);
setTimeout(()=>{if(!container.children.length)container.remove()},3300);
}
function showErrorToast(){
const lang=language[currentLanguage];
const container=setupToastContainer();
const toast=document.createElement("div");
toast.className="toast toast-error";
toast.innerHTML=`<span class="toast__icon">!</span><span class="toast__message">${lang.cartError||"Unable to add product to cart."}</span>`;
container.appendChild(toast);
setTimeout(()=>toast.remove(),3000);
setTimeout(()=>{if(!container.children.length)container.remove()},3050);
}
async function loadData(){
try{
const path=dataPaths[normalizedBrand];
if(!path){
root.innerHTML=`<section class="container"><h1>PDP ERROR</h1><p>Brand not found: ${brand}</p><p>Normalized: ${normalizedBrand}</p></section>`;
return;
}
const module=await import(path);
const products=module.products||[];
const collection=module.collection||{};
if(!products.length){
root.innerHTML=`<section class="container"><h1>PDP ERROR</h1><p>No products found.</p></section>`;
return;
}
const product=products.find(item=>String(item.id)===String(productId));
if(!product){
root.innerHTML=`<section class="container"><h1>PDP ERROR</h1><p>Product ID not found.</p><p>Brand: ${normalizedBrand}</p><p>ID: ${productId}</p></section>`;
return;
}
render(product,collection);
}catch(error){
console.error(error);
root.innerHTML=`<section class="container"><h1>PDP ERROR</h1><p>Unable to load product.</p><p>${error.message}</p></section>`;
}
}
function render(product,collection){
setDirection();
const lang=language[currentLanguage];
const productName=text(product.name,product.nameFa);
const category=text(product.category||collection.category,product.categoryFa||collection.categoryFa);
const brandName=text(collection.brand,collection.brandFa);
const description=text(product.description||collection.description,product.descriptionFa||collection.descriptionFa);
const gender=text(product.gender,product.genderFa);
const material=text(product.material,product.materialFa);
const sizes=currentLanguage==="fa"?(product.sizesFa||product.sizes||[]):(product.sizes||[]);
const colors=currentLanguage==="fa"?(product.colorNamesFa||product.colorNames||[]):(product.colorNames||[]);
const images=product.images&&product.images.length?product.images:[product.image];
root.innerHTML=`
<section class="container">
<div class="language-switcher">
<button id="languageButton" class="language-switcher__button">${lang.languageButton}</button>
</div>
<section class="pdp">
<div class="pdp-media">
<div class="pdp-thumbnails">
${images.map((image,index)=>`<img src="${image}" alt="${productName}" data-image="${image}" class="${index===0?"active":""}">`).join("")}
</div>
<div class="pdp-main-media">
<img id="mainProductImage" src="${images[0]}" alt="${productName}">
</div>
</div>
<div class="pdp-info">
<span class="pdp-category">${category}</span>
<h1 class="pdp-title">${productName}</h1>
<p class="pdp-subtitle">${description}</p>
<div class="pdp-price">
<span class="pdp-old-price">${product.oldPrice||""}</span>
<span class="pdp-current-price">${product.newPrice||""}</span>
<span class="pdp-discount">${lang.sale}</span>
</div>
<button id="addToCartButton" class="btn btn-primary">${lang.addToCart}</button>
</div>
</section>
<section class="pdp-description">
<h2>${lang.description}</h2>
<h3 class="pdp-category">${brandName}</h3>
<p>${description}</p>
<p>${productName}</p>
</section>
<section class="pdp-specs">
<h2>${lang.specifications}</h2>
<p>${lang.specificationText}</p>
<table>
<tbody>
<tr><th>${lang.brand}</th><td>${brandName}</td></tr>
<tr><th>${lang.product}</th><td>${productName}</td></tr>
<tr><th>${lang.category}</th><td>${category}</td></tr>
<tr><th>${lang.gender}</th><td>${gender||"-"}</td></tr>
<tr><th>${lang.material}</th><td>${material||"-"}</td></tr>
<tr>
<th>${lang.colors}</th>
<td>
<div class="spec-colors">
${colors.map((color,index)=>`<span class="spec-colors"><span class="color-dot" style="background:${getColor(product.colors?.[index]||color)}"></span>${color}</span>`).join("")}
</div>
</td>
</tr>
<tr><th>${lang.sizes}</th><td>${sizes.length?sizes.join(" / "):"-"}</td></tr>
</tbody>
</table>
</section>
</section>`;
document.getElementById("languageButton").addEventListener("click",()=>{
currentLanguage=currentLanguage==="en"?"fa":"en";
localStorage.setItem("pdpLanguage",currentLanguage);
render(product,collection);
});
document.getElementById("addToCartButton").addEventListener("click",()=>{
addToCart(product,collection);
});
document.querySelectorAll(".pdp-thumbnails img").forEach(thumbnail=>{
thumbnail.addEventListener("click",()=>{
document.getElementById("mainProductImage").src=thumbnail.dataset.image;
document.querySelectorAll(".pdp-thumbnails img").forEach(item=>item.classList.remove("active"));
thumbnail.classList.add("active");
});
});
}
function getColor(color){
const value=String(color||"").toLowerCase();
if(value.includes("gold")||value.includes("yellow"))return"#D4AF37";
if(value.includes("silver"))return"#C0C0C0";
if(value.includes("black"))return"#111";
if(value.includes("white"))return"#fff";
if(value.includes("red"))return"#C62828";
if(value.includes("blue"))return"#2563EB";
if(value.includes("green"))return"#2E7D32";
return"#ccc";
}
setDirection();
loadData();