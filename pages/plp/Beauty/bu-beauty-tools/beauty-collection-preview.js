import { beautyCategories } from "./beauty-collection-data.js";

import { collectionTranslations } from "./beauty-collection-i18n.js";

const homeText =
document.getElementById("homeText");

const beautyText =
    document.getElementById("beautyText");

const categoryGrid =
document.getElementById("categoryGrid");


const languageButton =
document.getElementById("languageButton");


const pageTitle =
document.getElementById("pageTitle");


const pageDescription =
document.getElementById("pageDescription");


const searchInput =
document.getElementById("searchInput");


const breadcrumbTitle =
document.getElementById("breadcrumbTitle");



let currentLanguage =
localStorage.getItem("language") || "en";



let filteredCategories =
beautyCategories;




function renderPageLanguage(){


    const text =
    collectionTranslations[currentLanguage];

    document.documentElement.lang =
currentLanguage;


document.documentElement.dir =
currentLanguage === "fa"
? "rtl"
            : "ltr";
    
    pageTitle.textContent =
    text.pageTitle;


    pageDescription.textContent =
    text.pageDescription;

    homeText.textContent =
text.home;

beautyText.textContent = text.women;
    
    searchInput.placeholder =
    text.searchPlaceholder;


    breadcrumbTitle.textContent =
    text.breadcrumbBeauty;


    languageButton.textContent =
    currentLanguage === "en"
    ? "FA"
    : "EN";


}




function renderCategories(){


    const text =
    collectionTranslations[currentLanguage];


    categoryGrid.innerHTML =


    filteredCategories.map(category => `


    <a

class="plp-category-card"

href="beauty-products.html?category=${category.slug}">


    <img

        src="${category.image}"

        alt="${category.title[currentLanguage]}"

        loading="lazy">



    <div class="plp-category-card__body">


        <h3>

            ${category.title[currentLanguage]}

        </h3>



        <span>

            ${category.productCount}

            ${text.products}

        </span>


    </div>


</a>


    `).join("");

}




languageButton.addEventListener(
"click",
()=>{


    currentLanguage =
    currentLanguage === "en"
    ? "fa"
    : "en";


    localStorage.setItem(
        "language",
        currentLanguage
    );


    filteredCategories =
    beautyCategories;


    renderPageLanguage();

    renderCategories();


});





searchInput.addEventListener(
"input",
()=>{


    const value =
    searchInput.value
    .toLowerCase();



    filteredCategories =

    beautyCategories.filter(category => {


        return category.title[currentLanguage]
        .toLowerCase()
        .includes(value);


    });



    renderCategories();


});





renderPageLanguage();

renderCategories();
