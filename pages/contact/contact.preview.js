// =========================================
// Current Language
// =========================================

let currentLanguage = localStorage.getItem("language") || "en";

// =========================================
// Get Translation Value
// Example:
// hero.title
// form.email.placeholder
// achievements.0.title
// =========================================

function getTranslation(key) {
    const keys = key.split(".");

    let value = languageData[currentLanguage];

    for (const item of keys) {
        if (value === undefined) {
            console.warn(`Translation not found: ${key}`);
            return "";
        }

        value = value[item];
    }

    return value;
}

// =========================================
// Translate Texts
// =========================================

function translateTexts() {
    const elements = document.querySelectorAll("[data-lang]");

    elements.forEach((element) => {
        const key = element.dataset.lang;

        element.innerHTML = getTranslation(key);
    });
}

// =========================================
// Translate Placeholders
// =========================================

function translatePlaceholders() {
    const elements = document.querySelectorAll("[data-placeholder]");

    elements.forEach((element) => {
        const key = element.dataset.placeholder;

        element.placeholder = getTranslation(key);
    });
}

// =========================================
// Update HTML Document
// =========================================

function updateDocument() {

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "fa"
            ? "rtl"
            : "ltr";

}

// =========================================
// Update Language Button
// =========================================

function updateLanguageButton() {

    const languageBtn = document.querySelector(".language-btn");

    if (!languageBtn) return;

    languageBtn.textContent =
        currentLanguage === "en"
            ? "FA"
            : "EN";

}

// =========================================
// Translate Page
// =========================================

function translatePage() {

    updateDocument();

    translateTexts();

    translatePlaceholders();

    updateLanguageButton();

}

// =========================================
// Change Language
// =========================================

function changeLanguage(language) {

    currentLanguage = language;

    localStorage.setItem("language", currentLanguage);

    translatePage();

}

// =========================================
// Language Button Event
// =========================================

const languageBtn = document.querySelector(".language-btn");

if (languageBtn) {

    languageBtn.addEventListener("click", () => {

        const newLanguage =
            currentLanguage === "en"
                ? "fa"
                : "en";

        changeLanguage(newLanguage);

    });

}

// =========================================
// Initial Load
// =========================================

translatePage();