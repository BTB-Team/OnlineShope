const STORAGE_KEY = "language";

export const languages = {
    en: "en",
    fa: "fa",
};

export const translations = {
    en: {
        pageTitle: "Beauty Products",
        pageDescription: "Discover our beauty collection.",

        searchPlaceholder: "Search products...",

        emptyTitle: "No Products Found",
        emptyDescription: "Try another keyword.",

        viewDetails: "View Details",

        productsCount: (count) =>
            `${count} Product${count !== 1 ? "s" : ""}`,

        currency: "$",
    },

    fa: {
        pageTitle: "محصولات آرایشی",

        pageDescription:
            "مجموعه‌ای از بهترین محصولات آرایشی را مشاهده کنید.",

        searchPlaceholder: "جستجوی محصول...",

        emptyTitle: "محصولی پیدا نشد",

        emptyDescription:
            "عبارت دیگری را جستجو کنید.",

        viewDetails: "مشاهده جزئیات",

        productsCount: (count) =>
            `${count} محصول`,

        currency: "$",
    },
};

export function getLanguage() {

    const savedLanguage =
        localStorage.getItem(STORAGE_KEY);

    if (
        savedLanguage &&
        languages[savedLanguage]
    ) {
        return savedLanguage;
    }

    return languages.en;
}

export function setLanguage(language) {

    localStorage.setItem(
        STORAGE_KEY,
        language
    );

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        language === "fa"
            ? "rtl"
            : "ltr";
}

export function toggleLanguage() {

    const nextLanguage =
        getLanguage() === "en"
            ? "fa"
            : "en";

    setLanguage(nextLanguage);

    return nextLanguage;
}
export function translate(key) {

    const language = getLanguage();

    return translations[language][key];
}

export function translateCount(count) {

    const language = getLanguage();

    return translations[language]
        .productsCount(count);
}

export function getProductTitle(product) {

    const language = getLanguage();

    return (
        product?.title?.[language] ??
        product?.title?.en ??
        ""
    );
}

export function getProductDescription(product) {

    const language = getLanguage();

    return (
        product?.description?.[language] ??
        product?.description?.en ??
        ""
    );
}

export function getProductCategory(product) {

    const language = getLanguage();

    if (
        typeof product.category === "object" &&
        product.category !== null
    ) {
        return (
            product.category[language] ??
            product.category.en ??
            ""
        );
    }

    return product.category ?? "";
}

export function formatPrice(price) {

    const language = getLanguage();

    const currency =
        translations[language].currency;

    return `${currency}${Number(price).toFixed(2)}`;
}

export function initializeLanguage() {

    const language = getLanguage();

    setLanguage(language);

    return language;
}