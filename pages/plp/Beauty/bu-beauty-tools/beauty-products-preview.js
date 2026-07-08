import { beautyProducts } from "./beauty-products-data.js";


import {
    initializeLanguage,
    getLanguage,
    toggleLanguage,
    translate,
    translateCount,
    getProductTitle,
    getProductDescription,
    formatPrice,
} from "./beauty-products-i18n.js";



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


let currentProducts =
    selectedCategory
        ? beautyProducts.filter(
            product =>
                product.category === selectedCategory
        )
        : [...beautyProducts];





// ================= INIT =================


function init() {


    initializeLanguage();


    updateStaticContent();


    renderProducts(
        currentProducts
    );


    bindEvents();


}





// ================= STATIC TEXT =================


function updateStaticContent() {


    const language =
        getLanguage();



    document.documentElement.lang =
        language;



    document.documentElement.dir =
        language === "fa"
            ? "rtl"
            : "ltr";



    pageTitle.textContent =
        translate("pageTitle");



    pageDescription.textContent =
        translate("pageDescription");



    productSearch.placeholder =
        translate("searchPlaceholder");



    emptyTitle.textContent =
        translate("emptyTitle");



    emptyDescription.textContent =
        translate("emptyDescription");



    languageToggle.textContent =
        language === "en"
            ? "FA"
            : "EN";


}






// ================= RENDER =================


function renderProducts(products) {


    productGrid.innerHTML = "";



    productsCount.textContent =
        translateCount(
            products.length
        );



    if (products.length === 0) {


        emptyState.classList.remove(
            "hidden"
        );


        return;

    }



    emptyState.classList.add(
        "hidden"
    );



    const fragment =
        document.createDocumentFragment();



    products.forEach(product => {


        fragment.appendChild(
            createProductCard(product)
        );


    });



    productGrid.appendChild(
        fragment
    );


}

// ================= PRODUCT CARD =================


function createProductCard(product) {


    const card =
        document.createElement("article");



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
                    ? `
                    <span class="product-card__badge">

                        ${product.badge}

                    </span>
                    `
                    : ""
            }




            <button

                class="product-card__floating-cart icon-button"

                type="button"

                aria-label="Add to cart">


                🛒


            </button>



        </div>




        <div class="product-card__content">



            <h3 class="product-card__title">

                ${getProductTitle(product)}

            </h3>





            <div class="product-card__price">


                ${
                    product.oldPrice
                        ? `
                        <span class="product-card__old-price number">

                            ${formatPrice(product.oldPrice)}

                        </span>
                        `
                        : ""
                }



                <span class="product-card__new-price number">

                    ${formatPrice(product.price)}

                </span>



            </div>





            <div class="product-card__details btn btn-ghost">


                <a

                    href="#"

                    data-action="details">


                    ${translate("viewDetails")} →


                </a>



            </div>



        </div>


    `;



    return card;


}






// ================= EVENTS =================


function bindEvents() {



    productSearch.addEventListener(
        "input",
        handleSearch
    );



    languageToggle.addEventListener(
        "click",
        handleLanguageChange
    );



    productGrid.addEventListener(
        "click",
        handleProductClick
    );



}






// ================= SEARCH =================


function handleSearch(event) {


    const value =
        event.target.value
            .trim()
            .toLowerCase();




    currentProducts =
        beautyProducts.filter(product => {



            const titleEN =
                product.title?.en || "";



            const titleFA =
                product.title?.fa || "";



            const descriptionEN =
                product.description?.en || "";



            const descriptionFA =
                product.description?.fa || "";




            const searchableText = `

                ${titleEN}

                ${titleFA}

                ${descriptionEN}

                ${descriptionFA}

            `.toLowerCase();




            return searchableText.includes(
                value
            );


        });




    renderProducts(
        currentProducts
    );


}






// ================= LANGUAGE =================


function handleLanguageChange() {


    toggleLanguage();



    updateStaticContent();



    renderProducts(
        currentProducts
    );


}

// ================= VIEW DETAILS =================


function handleProductClick(event) {


    const button =
        event.target.closest(
            "[data-action='details']"
        );



    if (!button) {

        return;

    }




    event.preventDefault();




    const card =
        button.closest(
            ".product-card"
        );



    const productId =
        card.dataset.id;




    const selectedProduct =
        beautyProducts.find(
            product =>
                String(product.id) ===
                String(productId)
        );



    if (!selectedProduct) {

        return;

    }




    localStorage.setItem(
        "selectedBeautyProduct",
        JSON.stringify(
            selectedProduct
        )
    );



    console.log(
        "Saved product:",
        selectedProduct
    );


}






// ================= START =================


init();