(() => {

    "use strict";


    /* =========================================================
       STATE
    ========================================================= */

    let currentLanguage = "en";

    let countdownTimer = null;


    /* =========================================================
       HELPERS
    ========================================================= */

    const getText = (key) => {

        const data = window.i18n;

        return (
            data?.[currentLanguage]?.sale?.[key] ??
            data?.en?.sale?.[key] ??
            key
        );

    };


    const getLocalizedValue = (value) => {

        if (
            value &&
            typeof value === "object"
        ) {

            return (
                value[currentLanguage] ??
                value.en ??
                ""
            );

        }

        return value ?? "";

    };


    /* =========================================================
       SALE BANNER
    ========================================================= */

    const renderSaleBanner = () => {

        const banner =
            document.querySelector(
                "[data-sale-banner]"
            );


        if (!banner) {
            return;
        }


        banner.innerHTML = `

            <div class="sale__content">

                <div class="sale__text">

                    <h1 class="sale__title">
                        ${getText("title")}
                    </h1>


                    <p class="sale__subtitle">
                        ${getText("subtitle")}
                    </p>


                    <div class="sale__divider"></div>


                    <p class="sale__description">
                        ${getText("description")}
                    </p>


                    <div
                        class="sale__countdown"
                        data-countdown
                    >

                        <div class="sale__time">

                            <strong data-days>
                                00
                            </strong>

                            <span>
                                ${getText("days")}
                            </span>

                        </div>


                        <div class="sale__time">

                            <strong data-hours>
                                00
                            </strong>

                            <span>
                                ${getText("hours")}
                            </span>

                        </div>


                        <div class="sale__time">

                            <strong data-minutes>
                                00
                            </strong>

                            <span>
                                ${getText("minutes")}
                            </span>

                        </div>


                        <div class="sale__time">

                            <strong data-seconds>
                                00
                            </strong>

                            <span>
                                ${getText("seconds")}
                            </span>

                        </div>

                    </div>

                </div>


                <div
                    class="sale__media"
                    aria-hidden="true"
                    style="
                        background-image:
                        url('${saleData.bannerImage}');
                    "
                ></div>

            </div>

        `;

    };


    /* =========================================================
       COUNTDOWN
    ========================================================= */

    const updateCountdown = () => {

        const endDate =
            new Date(
                saleData.countdown.endDate
            ).getTime();


        const now =
            Date.now();


        let difference =
            endDate - now;


        if (difference < 0) {
            difference = 0;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    difference %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (
                    difference %
                    (1000 * 60)
                ) /
                1000
            );


        const daysElement =
            document.querySelector(
                "[data-days]"
            );


        const hoursElement =
            document.querySelector(
                "[data-hours]"
            );


        const minutesElement =
            document.querySelector(
                "[data-minutes]"
            );


        const secondsElement =
            document.querySelector(
                "[data-seconds]"
            );


        if (daysElement) {

            daysElement.textContent =
                String(days).padStart(2, "0");

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(2, "0");

        }

    };


    const startCountdown = () => {

        if (countdownTimer) {

            clearInterval(
                countdownTimer
            );

        }


        updateCountdown();


        countdownTimer =
            setInterval(
                updateCountdown,
                1000
            );

    };


    /* =========================================================
       PRODUCT CARD
    ========================================================= */

    const createProductCard = (product) => {

        const article =
            document.createElement("article");


        article.className =
            `product-card product-card--${product.id}`;


        const title =
            getLocalizedValue(
                product.title
            );


        const price =
            getLocalizedValue(
                product.price
            );


        const oldPrice =
            getLocalizedValue(
                product.oldPrice
            );


        article.innerHTML = `

            <div class="product-card__image">

                <div
                    class="product-card__image-inner"
                    style="
                        background-image:
                        url('${product.image}');
                    "
                ></div>


                <div class="product-card__discount">

                    <strong>
                        ${product.discount}%
                    </strong>

                    <small>
                        ${getText("discount")}
                    </small>

                </div>

            </div>


            <div class="product-card__content">

                <h2 class="product-card__title">
                    ${title}
                </h2>


                <div class="product-card__prices">

                    <span class="product-card__price">
                        ${price}
                    </span>


                    <span class="product-card__old-price">
                        ${oldPrice}
                    </span>

                </div>


                <button
                    type="button"
                    class="product-card__details"
                    data-product-details
                    data-product-id="${product.id}"
                >

                    <span>
                        ${getText("details")}
                    </span>


                    <svg
                        class="product-card__details-icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >

                        <path
                            d="M5 12h14"
                        />

                        <path
                            d="m13 6 6 6-6 6"
                        />

                    </svg>

                </button>

            </div>

        `;


        return article;

    };


    /* =========================================================
       PRODUCTS
    ========================================================= */

    const renderProducts = () => {

        const productsContainer =
            document.querySelector(
                "[data-products]"
            );


        if (!productsContainer) {
            return;
        }


        productsContainer.innerHTML = "";


        const grid =
            document.createElement("div");


        grid.className =
            "products__grid";


        saleData.products.forEach(
            (product) => {

                grid.appendChild(
                    createProductCard(product)
                );

            }
        );


        productsContainer.appendChild(
            grid
        );

    };


    /* =========================================================
       LANGUAGE
    ========================================================= */

    const updateLanguage = () => {

        document.documentElement.lang =
            currentLanguage;


        document.documentElement.dir =
            currentLanguage === "fa"
                ? "rtl"
                : "ltr";


        const languageButtons =
            document.querySelectorAll(
                "[data-language]"
            );


        languageButtons.forEach(
            (button) => {

                const active =
                    button.dataset.language ===
                    currentLanguage;


                button.classList.toggle(
                    "is-active",
                    active
                );


                button.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            }
        );


        document.title =
            getText("pageTitle");


        const banner =
            document.querySelector(
                "[data-sale-banner]"
            );


        if (banner) {

            banner.setAttribute(
                "aria-label",
                getText("ariaLabel")
            );

        }


        renderSaleBanner();

        renderProducts();

        updateCountdown();

    };


    /* =========================================================
       LANGUAGE SWITCHER
    ========================================================= */

    const setupLanguageSwitcher = () => {

        const button =
            document.querySelector(
                "[data-language-toggle]"
            );


        if (!button) {
            return;
        }


        button.textContent =
            currentLanguage.toUpperCase();


        button.setAttribute(
            "aria-label",
            currentLanguage === "en"
                ? "Switch to Persian"
                : "Switch to English"
        );


        button.addEventListener(
            "click",
            () => {

                currentLanguage =
                    currentLanguage === "en"
                        ? "fa"
                        : "en";


                localStorage.setItem(
                    "sale-language",
                    currentLanguage
                );


                button.textContent =
                    currentLanguage.toUpperCase();


                button.setAttribute(
                    "aria-label",
                    currentLanguage === "en"
                        ? "Switch to Persian"
                        : "Switch to English"
                );


                renderSaleBanner();

                renderProducts();

            }
        );

    };


    /* =========================================================
       PRODUCT DETAILS
    ========================================================= */

    const setupProductDetails = () => {

        document.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        "[data-product-details]"
                    );


                if (!button) {
                    return;
                }


                const productId =
                    button.dataset.productId ||
                    button.dataset.productDetails;


                const product =
                    saleData.products.find(
                        (item) =>
                            String(item.id) ===
                            String(productId)
                    );


                if (!product) {
                    return;
                }


                const url =
                    product.productUrl ||
                    `./${
                        product.category === "bags"
                            ? "bags-product/bags.html"
                            : product.category === "shoes"
                                ? "shoes-product/shoes.html"
                                : product.category === "clothes"
                                    ? "clothes-product/clothes.html"
                                    : "acs-product/acs.html"
                    }`;


                if (url) {

                    window.location.href =
                        url;

                    return;

                }


                return;

            }
        );

    };


    /* =========================================================
       INITIALIZE
    ========================================================= */

    const init = () => {

        if (
            typeof saleData ===
            "undefined"
        ) {

            return;

        }


        if (
            typeof i18n ===
            "undefined"
        ) {

            return;

        }


        updateLanguage();

        setupLanguageSwitcher();

        setupProductDetails();

        startCountdown();

    };


    /* =========================================================
       START
    ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else {

        init();

    }

})();