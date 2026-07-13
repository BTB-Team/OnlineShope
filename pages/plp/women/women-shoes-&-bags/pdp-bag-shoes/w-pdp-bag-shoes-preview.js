import { bagShoesPdpData } from "./w-pdp-bag-shoes-data.js";


import {
  getProductTitle,
  getProductDescription,
  formatPrice,
  initializeLanguage,
  toggleLanguage,
  translate,
  getLanguage,

} from "./w-pdp-bag-shoes-i18n.js";



import { 
  bagShoesProducts 

} from "../w-plp-bag-shoes-data.js";




// ================= CONSTANT =================


const CART_KEY = "bagShoesCart";




// ================= PRODUCT =================


const urlParams =
new URLSearchParams(
  window.location.search
);



const productId =
urlParams.get("id");



const product =
bagShoesProducts.find(
  item =>
  String(item.id) === String(productId)
);



const productDetails =
bagShoesPdpData[productId];





if(!product){


  window.location.href =
  "../plp-bag-shoes/w-bag-shoes-products.html";


  throw new Error(
    "Product not found"
  );

}





// ================= DOM =================



const mainImage =
document.getElementById(
  "mainImage"
);



const thumbnails =
document.getElementById(
  "thumbnails"
);





const productTitle =
document.getElementById(
  "productTitle"
);



const productSubtitle =
document.getElementById(
  "productSubtitle"
);



const productDescription =
document.getElementById(
  "productDescription"
);



const productCategory =
document.getElementById(
  "productCategory"
);



const currentPrice =
document.getElementById(
  "currentPrice"
);



const oldPrice =
document.getElementById(
  "oldPrice"
);





const specificationsTable =
document.getElementById(
  "specificationsTable"
);






// Breadcrumb


const homeText =
document.getElementById(
  "homeText"
);



const womenText =
document.getElementById(
  "womenText"
);



const bagsShoesText =
document.getElementById(
  "bagsShoesText"
);



const productsText =
document.getElementById(
  "productsText"
);



const breadcrumbTitle =
document.getElementById(
  "breadcrumbTitle"
);






// Buttons


const addToCartBtn =
document.getElementById(
  "addToCartBtn"
);



const languageSwitcher =
document.getElementById(
  "languageSwitcher"
);






// ================= GALLERY =================



function renderGallery(){


if(!mainImage || !thumbnails)
return;



thumbnails.innerHTML="";



const images =
productDetails?.images ||
[
 product.image
];



mainImage.src =
images[0];



mainImage.alt =
getProductTitle(product);



images.forEach(
(image,index)=>{


const thumbnail =
document.createElement(
"img"
);



thumbnail.src =
image;



thumbnail.alt =
getProductTitle(product);



thumbnail.className =
"pdp-thumbnail";



if(index===0){

thumbnail.classList.add(
"active"
);

}




thumbnail.addEventListener(
"click",
()=>{


mainImage.src =
image;



document
.querySelectorAll(
".pdp-thumbnail"
)
.forEach(
(item)=>{

item.classList.remove(
"active"
);

}
);



thumbnail.classList.add(
"active"
);


}
);



thumbnails.appendChild(
thumbnail
);



}
);



}






// ================= INFO =================



function renderInfo(){



if(productTitle){

productTitle.textContent =
getProductTitle(product);

}



if(productSubtitle){

productSubtitle.textContent =
getProductDescription(product);

}



if(productDescription){

productDescription.textContent =
getProductDescription(product);

}



if(productCategory){

productCategory.textContent =
product.category;

}



if(currentPrice){

currentPrice.textContent =
formatPrice(
product.price
);

}



if(oldPrice){

oldPrice.textContent =
product.oldPrice
?
formatPrice(product.oldPrice)
:
"";

}



if(breadcrumbTitle){

breadcrumbTitle.textContent =
getProductTitle(product);

}


}






// ================= STATIC =================



function renderStaticTexts(){



if(homeText)

homeText.textContent =
translate("home");



if(womenText)

womenText.textContent =
translate("women");



if(bagsShoesText)

bagsShoesText.textContent =
translate("bagsShoes");



if(productsText)

productsText.textContent =
translate("products");



if(addToCartBtn)

addToCartBtn.textContent =
translate("addToCart");



if(languageSwitcher)

languageSwitcher.textContent =
getLanguage()
.toUpperCase();



}





// ================= SPECIFICATIONS =================



function renderSpecifications(){



if(!specificationsTable)
return;



specificationsTable.innerHTML="";



const specs =
productDetails?.specifications || [];



const language =
getLanguage();



specs.forEach(
item=>{


const row =
document.createElement(
"tr"
);



row.innerHTML = `


<td>

${

item.name[language]

||

item.name.en

}

</td>


<td>

${

item.value[language]

||

item.value.en

}

</td>


`;



specificationsTable.appendChild(
row
);


}

);



}








// ================= CART =================



function addToCart(){



let cart =
JSON.parse(
localStorage.getItem(
CART_KEY
)
)
||
[];




cart.push({

id:product.id,

title:product.title,

price:product.price,

image:product.image,

quantity:1

});




localStorage.setItem(

CART_KEY,

JSON.stringify(cart)

);



console.log(
"Added:",
product
);



}







// ================= EVENTS =================



function bindEvents(){



addToCartBtn?.addEventListener(

"click",

addToCart

);



languageSwitcher?.addEventListener(

"click",

()=>{


toggleLanguage();


location.reload();


}

);



}







// ================= INIT =================


function init(){


initializeLanguage();


renderStaticTexts();


renderInfo();


renderGallery();


renderSpecifications();


bindEvents();



}




init();