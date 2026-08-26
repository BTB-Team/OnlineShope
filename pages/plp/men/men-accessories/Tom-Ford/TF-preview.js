import{products}from"./TF-data.js";
import{language}from"./TF-i18n.js";
let currentLanguage="en";
const root=document.getElementById("root");
const cartBrand = "tom-ford";setDirection();
render();
function setDirection(){
document.documentElement.lang=currentLanguage;
document.documentElement.dir=currentLanguage==="fa"?"rtl":"ltr";
document.body.dir=currentLanguage==="fa"?"rtl":"ltr";
}
function render(){
setDirection();
const lang=language[currentLanguage];
root.innerHTML=`
<section class="container">
<div class="language-switcher">
<button id="languageButton" class="language-switcher__button">${currentLanguage.toUpperCase()}</button>
</div>
<section class="plp-header">
<h1 class="plp-header__title">${lang.title}</h1>
<p class="plp-header__description">${lang.description}</p>
<span class="plp-header__count">${lang.count}</span>
</section>
<div class="search-box">
<input id="searchInput" class="search-box__input" type="text" placeholder="${lang.search}">
</div>
<section class="product-grid" id="productGrid"></section>
</section>`;
renderProducts(products);
createCartDrawer();
document.getElementById("searchInput").addEventListener("input",searchProducts);
document.getElementById("languageButton").addEventListener("click",changeLanguage);
}
function changeLanguage(){
currentLanguage=currentLanguage==="en"?"fa":"en";
render();
}
function renderProducts(data){
const lang=language[currentLanguage];
const grid=document.getElementById("productGrid");
grid.innerHTML="";
data.forEach(product=>{
const productName=currentLanguage==="fa"?(product.nameFa||product.name):product.name;
grid.innerHTML+=`
<article class="product-card">
<div class="product-card__media">
<img class="product-card__image" src="${product.image}" alt="${productName}">
<span class="product-card__badge">${lang.sale}</span>
<button class="product-card__floating-cart" data-brand="michael-kors" data-id="${product.id}" aria-label="Cart">
<svg width="22" height="22" viewBox="0 0 512 512" fill="white">
<path class="st0" d="M456.169,230.305c-31.675-12.846-55.203-36.078-78.763-73.623c-27.405-43.677-29.413-80.099-41.628-104.848C322.908,25.733,293.11,0,256.13,0c-36.971,0-66.778,25.733-79.648,51.834c-12.214,24.749-14.231,68.025-34.774,110.833c-19.183,39.971-56.507,59.941-85.617,67.638c-25.396,6.73-17.854,28.864-17.854,28.864l22.338,161.51C67.814,473.028,112.557,512,165.399,512h181.463c52.842,0,97.584-38.972,104.832-91.322l22.33-161.51C474.024,259.169,480.516,240.182,456.169,230.305z M311.981,181.635c0,17.748-4.476,34.168-7.829,40.972c-7.672,15.543-25.97,22.264-48.022,22.264c-22.051,0-40.348-6.722-48.022-22.264c-3.344-6.804-7.829-23.224-7.829-40.972v-56.416c0-17.74,4.484-34.168,7.829-40.955c7.673-15.55,25.97-32.282,48.022-32.282c22.052,0,40.349,16.732,48.022,32.282c3.353,6.788,7.829,23.216,7.829,40.955V181.635z"></path>
</svg>
</button>
</div>
<div class="product-card__content">
<h3 class="product-card__title">${productName}</h3>
<div class="product-card__price">
<span class="product-card__old-price">${product.oldPrice}</span>
<span class="product-card__new-price">${product.newPrice}</span>
</div>
<div class="product-card__details btn btn-ghost">
<a href="../pdp/pdp.html?brand=Tom-Ford&id=${product.id}">${lang.details}</a>
</div>
</div>
</article>`;
});
grid.querySelectorAll(".product-card__floating-cart").forEach(button=>{
button.addEventListener("click",()=>{
const id=button.dataset.id;
const product=products.find(item=>String(item.id)===String(id));
if(product)addToCart(product);
});
});
}
function searchProducts(event){
const value=event.target.value.toLowerCase();
const filtered=products.filter(product=>{
const englishName=(product.name||"").toLowerCase();
const persianName=(product.nameFa||"").toLowerCase();
return englishName.includes(value)||persianName.includes(value);
});
renderProducts(filtered);
}
function getCart(){
try{
return JSON.parse(localStorage.getItem(`cart_${cartBrand}`)||"[]");
}catch(error){
return[];
}
}
function saveCart(cart){
localStorage.setItem(`cart_${cartBrand}`,JSON.stringify(cart));
}
function addToCart(product){
const cart=getCart();
const existing=cart.find(item=>String(item.id)===String(product.id));
if(existing){
existing.quantity=(existing.quantity||1)+1;
}else{
cart.push({
id:product.id,
brand:cartBrand,
name:product.name||"",
nameFa:product.nameFa||"",
category:product.category||"",
categoryFa:product.categoryFa||"",
oldPrice:product.oldPrice||"",
newPrice:product.newPrice||"",
image:product.image||"",
quantity:1
});
}
saveCart(cart);
renderCart();
openCart();
}
function createCartDrawer(){
if(document.querySelector(".cart-drawer"))return;
const cartHTML=`
<div class="cart-overlay"></div>
<aside class="cart-drawer">
<div class="cart-header">
<h2 class="cart-title">${currentLanguage==="fa"?"سبد خرید":"Your Cart"}</h2>
<button class="cart-close" aria-label="Close Cart">✕</button>
</div>
<div class="cart-body"></div>
<div class="cart-footer">
<div class="cart-total">
<span class="number">${currentLanguage==="fa"?"جمع کل":"Subtotal"}</span>
<strong class="cart-total__price number">$0</strong>
</div>
<button class="cart-checkout">${currentLanguage==="fa"?"تسویه حساب از طریق واتساپ":"Checkout via WhatsApp"}</button>
</div>
</aside>`;
document.body.insertAdjacentHTML("afterbegin",cartHTML);
document.querySelector(".cart-close").addEventListener("click",closeCart);
document.querySelector(".cart-overlay").addEventListener("click",closeCart);
renderCart();
}
function renderCart(){
const drawer=document.querySelector(".cart-drawer");
const body=document.querySelector(".cart-body");
const totalElement=document.querySelector(".cart-total__price");
if(!drawer||!body||!totalElement)return;
const cart=getCart();
body.innerHTML="";
let total=0;
if(!cart.length){
body.innerHTML=`<p class="cart-empty">${currentLanguage==="fa"?"سبد خرید خالی است":"Your cart is empty."}</p>`;
totalElement.textContent="$0";
return;
}
cart.forEach(item=>{
const price=parseFloat(String(item.newPrice||"0").replace(/[^0-9.]/g,""))||0;
total+=price*(item.quantity||1);
const name=currentLanguage==="fa"?(item.nameFa||item.name):item.name;
const category=currentLanguage==="fa"?(item.categoryFa||item.category):item.category;
body.innerHTML+=`
<div class="cart-item">
<img class="cart-item__image" src="${item.image}" alt="${name}">
<div class="cart-item__content">
<h3 class="cart-item__title">${name}</h3>
<p class="cart-item__category">${category||"Accessories"}</p>
<span class="cart-item__price number">${item.newPrice}</span>
</div>
<div class="cart-item__actions">
<div class="cart-qty">
<button class="number cart-minus" data-id="${item.id}">-</button>
<span class="number">${item.quantity||1}</span>
<button class="number cart-plus" data-id="${item.id}">+</button>
</div>
<button class="cart-remove" data-id="${item.id}">${currentLanguage==="fa"?"حذف":"Remove"}</button>
</div>
</div>`;
});
totalElement.textContent=`$${total.toFixed(2)}`;
bindCartEvents();
}
function bindCartEvents(){
document.querySelectorAll(".cart-plus").forEach(button=>{
button.addEventListener("click",()=>{
changeQuantity(button.dataset.id,1);
});
});
document.querySelectorAll(".cart-minus").forEach(button=>{
button.addEventListener("click",()=>{
changeQuantity(button.dataset.id,-1);
});
});
document.querySelectorAll(".cart-remove").forEach(button=>{
button.addEventListener("click",()=>{
removeFromCart(button.dataset.id);
});
});
}
function changeQuantity(id,change){
const cart=getCart();
const item=cart.find(product=>String(product.id)===String(id));
if(!item)return;
item.quantity=(item.quantity||1)+change;
if(item.quantity<=0){
const index=cart.indexOf(item);
cart.splice(index,1);
}
saveCart(cart);
renderCart();
}
function removeFromCart(id){
const cart=getCart().filter(item=>String(item.id)!==String(id));
saveCart(cart);
renderCart();
}
function openCart(){
const drawer=document.querySelector(".cart-drawer");
const overlay=document.querySelector(".cart-overlay");
if(drawer)drawer.classList.add("active");
if(overlay)overlay.classList.add("active");
}
function closeCart(){
const drawer=document.querySelector(".cart-drawer");
const overlay=document.querySelector(".cart-overlay");
if(drawer)drawer.classList.remove("active");
if(overlay)overlay.classList.remove("active");
}