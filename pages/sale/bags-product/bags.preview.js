(() => {
    "use strict";

    let currentLanguage = localStorage.getItem("sale-language") || "en";

    if (!["en", "fa"].includes(currentLanguage)) {
        currentLanguage = "en";
    }

    const CATEGORY = "bags";

    const showToast = (type, message) => {
        let container = document.querySelector(".toast-container");

        if (!container) {
            container = document.createElement("div");
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const icons = {
            success: "✓",
            remove: "✓",
            warning: "⚠",
            error: "✕"
        };

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;

        toast.innerHTML = `
            <span class="toast__icon">${icons[type] || "✓"}</span>
            <span class="toast__message">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = "opacity .3s ease";
            toast.style.opacity = "0";

            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2500);
    };

    const loadSharedCart = () => {
        try {
            const value = JSON.parse(
                localStorage.getItem("saleCart_" + CATEGORY) || "[]"
            );

            return Array.isArray(value)
                ? value.map(item =>
                    item?.product
                        ? item
                        : {
                            product: item,
                            quantity: Number(item?.quantity) || 1
                        }
                )
                : [];
        } catch (error) {
            console.error("Unable to read saleCart:", error);
            return [];
        }
    };

    const saveSharedCart = () => {
        localStorage.setItem(
            "saleCart_" + CATEGORY,
            JSON.stringify(state.cart)
        );
    };

    const state = {
        search: "",
        cart: loadSharedCart()
    };

    const getProducts = () => {
        return Array.isArray(window.products)
            ? window.products
            : [];
    };

    const getTranslations = () => {
        return window.translations &&
            typeof window.translations === "object"
            ? window.translations
            : {};
    };

    const getText = (key) => {
        const data = getTranslations();

        return (
            data[currentLanguage]?.[key] ??
            data.en?.[key] ??
            key
        );
    };

    const getProductTitle = (product) => {
        return (
            product?.title?.[currentLanguage] ??
            product?.title?.en ??
            ""
        );
    };

    const getProductImage = (product) => {
        return product?.image ?? "";
    };

    const getProductPriceNumber = (product) => {
        const value = String(product?.price ?? "");

        const number = Number(
            value.replace(/[^0-9.-]/g, "")
        );

        return Number.isFinite(number)
            ? number
            : 0;
    };

    const formatPrice = (value) => {
        return `$${Number(value).toLocaleString("en-US")}`;
    };

    const createCartIcon = () => {
        return `
            <img
                class="product-card__cart-icon"
                src="../../../src/assets/icons/cart-bag.svg"
                alt=""
                aria-hidden="true"
            >
        `;
    };

    const createPage = () => {
        document.body.innerHTML = "";

        const page = document.createElement("main");

        page.className = "container plp-page";

        page.innerHTML = `
            <div
                class="language-switcher"
                role="group"
                aria-label="Language"
            >
                <button
                    type="button"
                    class="language-switcher__button"
                    id="languageToggle"
                    data-language-toggle
                    aria-label="Switch language"
                >
                    ${getText("language")}
                </button>
            </div>

            <section class="plp-header">
                <h1
                    class="plp-header__title"
                    id="plpTitle"
                ></h1>

                <p
                    class="plp-header__description"
                    id="plpDescription"
                ></p>

                <span
                    class="plp-header__count"
                    id="plpCount"
                ></span>
            </section>

            <div class="search-box">
                <svg
                    class="search-box__icon"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                    ></circle>

                    <path
                        d="m16 16 5 5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                    ></path>
                </svg>

                <input
                    id="productSearch"
                    class="search-box__input"
                    type="search"
                    autocomplete="off"
                >
            </div>

            <section
                id="productGrid"
                class="product-grid"
                aria-live="polite"
            ></section>
        `;

        document.body.appendChild(page);

        createCartDrawer();
    };

    const createCartDrawer = () => {
        const drawer = document.createElement("aside");

        drawer.className = "cart-drawer";
        drawer.id = "cartDrawer";
        drawer.setAttribute("aria-hidden", "true");

        drawer.innerHTML = `
            <div
                class="cart-drawer__overlay"
                id="cartOverlay"
            ></div>

            <div
                class="cart-drawer__panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cartTitle"
            >
                <div class="cart-drawer__header">
                    <h2
                        class="cart-drawer__title"
                        id="cartTitle"
                    ></h2>

                    <button
                        type="button"
                        class="cart-drawer__close"
                        id="cartClose"
                        aria-label="Close cart"
                    >
                        ×
                    </button>
                </div>

                <div
                    class="cart-drawer__body"
                    id="cartItems"
                ></div>

                <div class="cart-drawer__footer">
                    <div class="cart-drawer__subtotal">
                        <span id="cartSubtotalLabel"></span>

                        <strong id="cartSubtotalValue">
                            $0
                        </strong>
                    </div>

                    <button
                        type="button"
                        class="cart-drawer__checkout"
                        id="cartCheckout"
                    ></button>
                </div>
            </div>
        `;

        document.body.appendChild(drawer);

        setupCartDrawerEvents();
    };

    const createProductCard = (product) => {
        const article = document.createElement("article");

        article.className = "product-card";

        const imagePath = getProductImage(product);
        const title = getProductTitle(product);

        article.innerHTML = `
            <div class="product-card__media">

                <img
                    class="product-card__image"
                    src="${imagePath}"
                    alt="${title}"
                    loading="lazy"
                >

                <button
                    type="button"
                    class="product-card__floating-cart"
                    aria-label="Add ${title} to cart"
                >
                    ${createCartIcon()}
                </button>

            </div>

            <div class="product-card__content">

                <h2 class="product-card__title">
                    ${title}
                </h2>

                <div class="product-card__price">
                    <span class="product-card__new-price">
                        ${product.price ?? ""}
                    </span>
                </div>

                <div class="product-card__details">
                    <a href="${product.productUrl ?? "#"}">
                        ${getText("viewDetails")} →
                    </a>
                </div>

            </div>
        `;

        const cartButton = article.querySelector(
            ".product-card__floating-cart"
        );

        if (cartButton) {
            cartButton.addEventListener("click", () => {
                addToCart(product);

                cartButton.classList.add("active");

                setTimeout(() => {
                    cartButton.classList.remove("active");
                }, 250);
            });
        }

        return article;
    };

    const addToCart = (product) => {
        const existingItem = state.cart.find(
            item =>
                item.product.id === product.id &&
                item.product.category === CATEGORY
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cart.push({
                product: {
                    ...product,
                    category: CATEGORY
                },
                quantity: 1
            });
        }

        saveSharedCart();
        renderCart();
        openCart();

        showToast(
            "success",
            currentLanguage === "fa"
                ? "محصول به سبد خرید اضافه شد"
                : "Product added to cart"
        );
    };

    const removeFromCart = (productId) => {
        state.cart = state.cart.filter(
            item =>
                !(
                    item.product.id === productId &&
                    item.product.category === CATEGORY
                )
        );

        saveSharedCart();
        renderCart();

        showToast(
            "remove",
            currentLanguage === "fa"
                ? "محصول از سبد خرید حذف شد"
                : "Product removed from cart"
        );
    };

    const changeQuantity = (productId, amount) => {
        const item = state.cart.find(
            cartItem =>
                cartItem.product.id === productId &&
                cartItem.product.category === CATEGORY
        );

        if (!item) {
            return;
        }

        item.quantity += amount;

        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        saveSharedCart();
        renderCart();
    };

    const calculateSubtotal = () => {
        return state.cart.reduce(
            (total, item) =>
                total +
                getProductPriceNumber(item.product) *
                item.quantity,
            0
        );
    };

    const renderCart = () => {
        const cartItems =
            document.getElementById("cartItems");

        const subtotalValue =
            document.getElementById(
                "cartSubtotalValue"
            );

        if (!cartItems || !subtotalValue) {
            return;
        }

        cartItems.innerHTML = "";

        if (state.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-drawer__empty">
                    ${getText("cartTitle")}
                </div>
            `;

            subtotalValue.textContent = "$0";
            return;
        }

        state.cart.forEach(item => {
            const product = item.product;
            const title = getProductTitle(product);
            const image = getProductImage(product);
            const price = getProductPriceNumber(product);

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-item__image-wrap">
                    <img
                        class="cart-item__image"
                        src="${image}"
                        alt="${title}"
                    >
                </div>

                <div class="cart-item__info">
                    <h3 class="cart-item__title">
                        ${title}
                    </h3>

                    <p class="cart-item__category">
                        ${getText("cartCategory")}
                    </p>

                    <p class="cart-item__price">
                        ${formatPrice(price)}
                    </p>
                </div>

                <div class="cart-item__actions">

                    <div class="cart-item__quantity">

                        <button
                            type="button"
                            class="cart-item__quantity-button"
                            data-action="decrease"
                            data-id="${product.id}"
                            aria-label="${getText("decreaseQuantity")}"
                        >
                            −
                        </button>

                        <span class="cart-item__quantity-value">
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            class="cart-item__quantity-button"
                            data-action="increase"
                            data-id="${product.id}"
                            aria-label="${getText("increaseQuantity")}"
                        >
                            +
                        </button>

                    </div>

                    <button
                        type="button"
                        class="cart-item__remove"
                        data-action="remove"
                        data-id="${product.id}"
                    >
                        ${getText("remove")}
                    </button>

                </div>
            `;

            cartItems.appendChild(cartItem);
        });

        subtotalValue.textContent =
            formatPrice(calculateSubtotal());

        setupCartItemEvents();
    };

    const setupCartItemEvents = () => {
        const buttons = document.querySelectorAll(
            ".cart-item__quantity-button, .cart-item__remove"
        );

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const productId =
                    Number(button.dataset.id);

                const action =
                    button.dataset.action;

                if (action === "increase") {
                    changeQuantity(productId, 1);
                }

                if (action === "decrease") {
                    changeQuantity(productId, -1);
                }

                if (action === "remove") {
                    removeFromCart(productId);
                }
            });
        });
    };

    const openCart = () => {
        const drawer =
            document.getElementById("cartDrawer");

        if (!drawer) {
            return;
        }

        drawer.classList.add("is-open");

        drawer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "cart-is-open"
        );
    };

    const closeCart = () => {
        const drawer =
            document.getElementById("cartDrawer");

        if (!drawer) {
            return;
        }

        drawer.classList.remove("is-open");

        drawer.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "cart-is-open"
        );
    };

    const setupCartDrawerEvents = () => {
        const closeButton =
            document.getElementById("cartClose");

        const overlay =
            document.getElementById("cartOverlay");

        if (closeButton) {
            closeButton.addEventListener(
                "click",
                closeCart
            );
        }

        if (overlay) {
            overlay.addEventListener(
                "click",
                closeCart
            );
        }

        document.addEventListener(
            "keydown",
            event => {
                if (event.key === "Escape") {
                    closeCart();
                }
            }
        );
    };

    const updateProductCount = count => {
        const countElement =
            document.getElementById("plpCount");

        if (!countElement) {
            return;
        }

        countElement.textContent =
            `${count} ${getText("productCount")}`;
    };

    const renderProducts = () => {
        const grid =
            document.getElementById("productGrid");

        if (!grid) {
            return;
        }

        grid.innerHTML = "";

        const allProducts = getProducts();

        const search =
            state.search
                .trim()
                .toLocaleLowerCase();

        const filteredProducts =
            allProducts.filter(product => {
                const englishTitle =
                    (product.title?.en ?? "")
                        .toLocaleLowerCase("en");

                const persianTitle =
                    (product.title?.fa ?? "")
                        .toLocaleLowerCase("fa");

                return (
                    englishTitle.includes(search) ||
                    persianTitle.includes(search)
                );
            });

        filteredProducts.forEach(product => {
            grid.appendChild(
                createProductCard(product)
            );
        });

        updateProductCount(
            filteredProducts.length
        );
    };

    const updateLanguage = () => {
        document.documentElement.lang =
            currentLanguage;

        document.documentElement.dir =
            currentLanguage === "fa"
                ? "rtl"
                : "ltr";

        document.body.dir =
            currentLanguage === "fa"
                ? "rtl"
                : "ltr";

        const languageButton =
            document.querySelector(
                "[data-language-toggle]"
            );

        const title =
            document.getElementById("plpTitle");

        const description =
            document.getElementById(
                "plpDescription"
            );

        const search =
            document.getElementById(
                "productSearch"
            );

        const cartTitle =
            document.getElementById("cartTitle");

        const subtotalLabel =
            document.getElementById(
                "cartSubtotalLabel"
            );

        const checkout =
            document.getElementById(
                "cartCheckout"
            );

        const closeButton =
            document.getElementById("cartClose");

        if (languageButton) {
            languageButton.textContent =
                getText("language");

            languageButton.setAttribute(
                "aria-label",
                currentLanguage === "en"
                    ? "Switch to Persian"
                    : "Switch to English"
            );

            languageButton.setAttribute(
                "aria-pressed",
                "true"
            );
        }

        if (title) {
            title.textContent =
                getText("title");
        }

        if (description) {
            description.textContent =
                getText("description");
        }

        if (search) {
            search.placeholder =
                getText("searchPlaceholder");
        }

        if (cartTitle) {
            cartTitle.textContent =
                getText("cartTitle");
        }

        if (subtotalLabel) {
            subtotalLabel.textContent =
                getText("subtotal");
        }

        if (checkout) {
            checkout.textContent =
                getText("checkout");
        }

        if (closeButton) {
            closeButton.setAttribute(
                "aria-label",
                getText("closeCart")
            );
        }

        renderProducts();
        renderCart();
    };

    const setupEvents = () => {
        const languageButton =
            document.querySelector(
                "[data-language-toggle]"
            );

        if (languageButton) {
            languageButton.addEventListener(
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

                    updateLanguage();
                }
            );
        }

        const searchInput =
            document.getElementById(
                "productSearch"
            );

        if (searchInput) {
            searchInput.addEventListener(
                "input",
                event => {
                    state.search =
                        event.target.value;

                    renderProducts();
                }
            );
        }
    };

    const init = () => {
        createPage();
        updateLanguage();
        setupEvents();
    };

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    } else {
        init();
    }
})();