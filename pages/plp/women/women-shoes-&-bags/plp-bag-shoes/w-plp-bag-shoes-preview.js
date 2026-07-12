import { bagShoesProducts } 
from "./w-plp-bag-shoes-data.js";


import {

initializeLanguage,
getLanguage,
toggleLanguage,
translate,
translateCount,
getProductTitle,
getProductDescription,
formatPrice

} 
from "./w-plp-bag-shoes-i18n.js";




// ================= DOM =================


const productGrid =
document.getElementById("productGrid");


const productSearch =
document.getElementById("productSearch");


const productsCount =
document.getElementById("productsCount");


const emptyState =
document.getElementById("emptyState");


const languageToggle =
document.getElementById("languageToggle");


const pageTitle =
document.getElementById("pageTitle");


const pageDescription =
document.getElementById("pageDescription");



// Breadcrumb

const breadcrumbHome =
document.getElementById("breadcrumbHome");


const breadcrumbWomen =
document.getElementById("breadcrumbWomen");


const breadcrumbBagsShoes =
document.getElementById("breadcrumbBagsShoes")
||
document.getElementById("breadcrumbTitle");



// Empty

const emptyTitle =
document.getElementById("emptyTitle");


const emptyDescription =
document.getElementById("emptyDescription");




// ================= STATE =================


const urlParams =
new URLSearchParams(
    window.location.search
);


const selectedCategory =
urlParams.get("category");



console.log(
    "Selected Category:",
    selectedCategory
);


console.log(
    "Products:",
    bagShoesProducts
);



let currentProducts = selectedCategory

?

bagShoesProducts.filter(

(product)=>

product.category === selectedCategory

)

:

[...bagShoesProducts];






// ================= INIT =================


function init(){


    initializeLanguage();


    updateStaticContent();


    renderProducts(
        currentProducts
    );


    bindEvents();


}







// ================= STATIC CONTENT =================


function updateStaticContent(){


    const language =
    getLanguage();



    document.documentElement.lang =
    language;



    document.documentElement.dir =

    language === "fa"

    ?

    "rtl"

    :

    "ltr";





    pageTitle.textContent =
    translate("pageTitle");



    pageDescription.textContent =
    translate("pageDescription");




    if(productSearch){

        productSearch.placeholder =
        translate("searchPlaceholder");

    }




    if(languageToggle){

        languageToggle.textContent =

        language === "en"

        ?

        "FA"

        :

        "EN";

    }





    if(emptyTitle){

        emptyTitle.textContent =
        translate("emptyTitle");

    }




    if(emptyDescription){

        emptyDescription.textContent =
        translate("emptyDescription");

    }






    if(breadcrumbHome){

        breadcrumbHome.textContent =
        translate("home");

    }



    if(breadcrumbWomen){

        breadcrumbWomen.textContent =
        translate("women");

    }



    if(breadcrumbBagsShoes){

        breadcrumbBagsShoes.textContent =
        translate("bagsShoes");

    }



}







// ================= RENDER =================


function renderProducts(products){


    productGrid.innerHTML = "";



    productsCount.textContent =
    translateCount(products.length);




    if(products.length === 0){


        emptyState.classList.remove(
            "hidden"
        );


        return;

    }




    emptyState.classList.add(
        "hidden"
    );

console.log(
    emptyState.className
);



    const fragment =
    document.createDocumentFragment();




    products.forEach(product=>{


        fragment.appendChild(
            createProductCard(product)
        );


    });




    productGrid.appendChild(
        fragment
    );


}







// ================= CARD =================


function createProductCard(product){



    const card =
    document.createElement(
        "article"
    );



    card.className =
    "product-card";


    card.dataset.id =
    product.id;





    card.innerHTML = `


<div class="product-card__media">


<img

class="product-card__image"

src="${product.image}"

alt="${getProductTitle(product)}"

loading="lazy">



${
product.badge

?

`

<span class="product-card__badge">

${product.badge}

</span>

`

:

""

}





<button

class="product-card__floating-cart icon-button"

type="button"

data-action="cart">

🛒

</button>



</div>






<div class="product-card__content">



<h3 class="product-card__title">

${getProductTitle(product)}

</h3>




<p class="product-card__description">

${getProductDescription(product)}

</p>





<div class="product-card__price">


${
product.oldPrice

?

`

<span class="product-card__old-price number">

${formatPrice(product.oldPrice)}

</span>

`

:

""

}



<span class="product-card__new-price number">

${formatPrice(product.price)}

</span>



</div>





<div class="product-card__details">


<a

href="#"

class="btn btn-ghost"

data-action="details">


${

getLanguage() === "fa"

?

translate("viewDetails")+" ←"

:

translate("viewDetails")+" →"

}



</a>


</div>



</div>


`;



return card;


}







// ================= EVENTS =================


function bindEvents(){


productSearch?.addEventListener(

"input",

handleSearch

);



languageToggle?.addEventListener(

"click",

handleLanguageChange

);



productGrid?.addEventListener(

"click",

handleProductClick

);


}







// ================= SEARCH =================


function handleSearch(event){


const value =

event.target.value
.trim()
.toLowerCase();




currentProducts =

bagShoesProducts.filter(product=>{


const text = `

${product.title.en}

${product.title.fa}

${product.description.en}

${product.description.fa}

`.toLowerCase();



return text.includes(value);



});



renderProducts(
currentProducts
);


}







// ================= LANGUAGE =================


function handleLanguageChange(){


toggleLanguage();


updateStaticContent();


renderProducts(
currentProducts
);


}







// ================= CLICK =================


function handleProductClick(event){


const cartButton =
event.target.closest(
"[data-action='cart']"
);



if(cartButton){


const card =
cartButton.closest(
".product-card"
);



const product =
bagShoesProducts.find(

item=>

String(item.id) ===

String(card.dataset.id)

);



console.log(
"Add To Cart:",
product
);



return;

}



}






// ================= START =================


init();