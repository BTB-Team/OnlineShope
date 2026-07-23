import { bagShoesCategories } 
from "./w-bag-shoes-col-data.js";


import { bagShoesTranslations } 
from "./w-bag-shoes-col-i18n.js";



const homeText =
document.getElementById("homeText");


const womenText =
document.getElementById("womenText");


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
bagShoesCategories;




function renderPageLanguage(){


    const text =
    bagShoesTranslations[currentLanguage];



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



    womenText.textContent =
    text.women;



    breadcrumbTitle.textContent =
    text.breadcrumbBagsShoes;



    searchInput.placeholder =
    text.searchPlaceholder;



    languageButton.textContent =
    currentLanguage === "en"
    ? "FA"
    : "EN";


}




function renderCategories(){


    const text =
    bagShoesTranslations[currentLanguage];



    categoryGrid.innerHTML =


    filteredCategories.map(category => `



<a

class="plp-category-card"

<a
class="plp-category-card"
href="../plp-bag-shoes/w-plp-bag-shoes.html?category=${category.slug}">



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
    bagShoesCategories;



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

    bagShoesCategories.filter(category=>{


        return category.title[currentLanguage]
        .toLowerCase()
        .includes(value);


    });



    renderCategories();


});






renderPageLanguage();

renderCategories();