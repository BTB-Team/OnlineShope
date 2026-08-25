import { collections } from "./men-data.js";
import { language } from "./men-i18n.js";
let currentLanguage="en";
const root=document.getElementById("root");
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
<button id="languageBtn" class="language-switcher__button">
${lang.button}
</button>
</div>
<section class="plp-hero">
<div class="plp-hero__content">
<h1 class="plp-hero__title">
${lang.title}
</h1>
<p class="plp-hero__description">
${lang.description}
</p>
</div>
<div class="plp__media">
<img src="/src/assets/images/Men-acs/hero.jpg" alt="Hero Image">
</div>
</section>
<div class="search-box">
<input id="searchInput" class="search-box__input" type="text" placeholder="${lang.search}">
</div>
<section class="plp-category-grid" id="collectionGrid">
</section>
</section>
`;
renderCards(collections);
document.getElementById("searchInput").addEventListener("input",searchCollection);
document.getElementById("languageBtn").addEventListener("click",toggleLanguage);
}
function renderCards(data){
const grid=document.getElementById("collectionGrid");
const lang=language[currentLanguage];
grid.innerHTML="";
data.forEach(item=>{
const brandName=currentLanguage==="fa"?item.nameFa:item.name;
grid.innerHTML+=`
<a href="${item.url}" class="plp-category-card">
<img src="${item.image}" alt="${brandName}">
<div class="plp-category-card__body">
<h3>${brandName}</h3>
<span>${item.products} ${lang.products}</span>
</div>
</a>
`;
});
}
function searchCollection(e){
const value=e.target.value.toLowerCase();
const filtered=collections.filter(item=>{
const name=item.name.toLowerCase();
const nameFa=(item.nameFa||"").toLowerCase();
return name.includes(value)||nameFa.includes(value);
});
renderCards(filtered);
}
function toggleLanguage(){
currentLanguage=currentLanguage==="en"?"fa":"en";
render();
}