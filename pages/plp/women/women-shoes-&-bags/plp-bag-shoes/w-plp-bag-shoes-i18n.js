const STORAGE_KEY = "language";


export const languages = {

    en: "en",

    fa: "fa",

};



export const translations = {


    en: {


        home: "Home",


        women: "Women",


        bagsShoes: "Bags & Shoes",


        products: "Products",



        pageTitle: "Women Bags & Shoes Products",



        pageDescription:
            "Discover our stylish collection of women's bags and shoes.",



        searchPlaceholder:
            "Search bags and shoes...",



        emptyTitle:
            "No Products Found",



        emptyDescription:
            "Try another keyword.",



        viewDetails:
            "View Details",



        productsCount: 
            (count) =>
            `${count} Product${count !== 1 ? "s" : ""}`,



        currency:
            "AFN",


    },




    fa: {


        home: "خانه",


        women: "زنانه",


        bagsShoes: "کیف و کفش",


        products: "محصولات",



        pageTitle:
            "محصولات کیف و کفش زنانه",



        pageDescription:
            "مجموعه‌ای از کیف‌ها و کفش‌های شیک زنانه برای هر استایل و موقعیت.",



        searchPlaceholder:
            "جستجوی کیف و کفش...",



        emptyTitle:
            "محصولی پیدا نشد",



        emptyDescription:
            "عبارت دیگری را جستجو کنید.",



        viewDetails:
            "مشاهده جزئیات",



        productsCount:
            (count) =>
            `${count} محصول`,



        currency:
            "افغانی",


    },


};







export function getLanguage(){


    const savedLanguage =
    localStorage.getItem(
        STORAGE_KEY
    );



    if(
        savedLanguage &&
        languages[savedLanguage]
    ){

        return savedLanguage;

    }



    return languages.en;


}







export function setLanguage(language){


    localStorage.setItem(
        STORAGE_KEY,
        language
    );



    document.documentElement.lang =
    language;



    document.documentElement.dir =

    language === "fa"

    ?

    "rtl"

    :

    "ltr";


}







export function toggleLanguage(){


    const nextLanguage =

    getLanguage() === "en"

    ?

    "fa"

    :

    "en";



    setLanguage(nextLanguage);



    return nextLanguage;


}







export function translate(key){


    const language =
    getLanguage();



    return translations[language][key];


}







export function translateCount(count){


    const language =
    getLanguage();



    return translations[language]
    .productsCount(count);


}







export function getProductTitle(product){


    const language =
    getLanguage();



    return product?.title?.[language]

    ??

    product?.title?.en

    ??

    "";


}







export function getProductDescription(product){


    const language =
    getLanguage();



    return product?.description?.[language]

    ??

    product?.description?.en

    ??

    "";


}







export function getProductCategory(product){


    const language =
    getLanguage();



    if(

        typeof product.category === "object"

        &&

        product.category !== null

    ){

        return (

            product.category[language]

            ??

            product.category.en

            ??

            ""

        );


    }



    return product.category ?? "";


}







export function formatPrice(price){


    const language =
    getLanguage();



    const number =

    new Intl.NumberFormat(

        language === "fa"

        ?

        "fa-AF"

        :

        "en-US",

    ).format(
        Number(price)
    );



    const currency =
    translations[language].currency;



    return `${number} ${currency}`;


}







export function initializeLanguage(){


    const language =
    getLanguage();



    setLanguage(language);



    return language;


}