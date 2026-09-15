(() => {
    const CATEGORY = "clothes";

    let currentLanguage = "en";
    let products = [];
    let translations = {};
    let filteredProducts = [];

    const root = document.getElementById("root");

    const getText = (key) => {
        return (
            translations?.[currentLanguage]?.[key] ??
            translations?.en?.[key] ??
            key
        );
    };

    const getProductTitle = (product) => {
        if (!product) {
            return "";
        }

        if (
            typeof product.title === "object" &&
            product.title !== null
        ) {
            return (
                product.title[currentLanguage] ??
                product.title.en ??
                Object.values(product.title)[0] ??
                ""
            );
        }

        return product.title ?? "";
    };

    const getProductImage = (product) => {
        if (!product) {
            return "";
        }

        if (Array.isArray(product.images) && product.images.length) {
            return product.images[0];
        }

        return product.image ?? "";
    };

    const getProductPriceNumber = (product) => {
        const price = Number(product?.price);

        return Number.isFinite(price) ? price : 0;
    };

    const formatPrice = (price) => {
        const numericPrice = Number(price) || 0;

        return new Intl.NumberFormat(
            currentLanguage === "fa" ? "fa-IR" : "en-US"
        ).format(numericPrice);
    };

    const showToast = (type, message) => {
        const existingToasts = document.querySelectorAll(
            ".laxura-toast"
        );

        existingToasts.forEach((toast) => {
            toast.remove();
        });

        const toast = document.createElement("div");

        toast.className = `laxura-toast laxura-toast--${type}`;
        toast.textContent = message;

        Object.assign(toast.style, {
            position: "fixed",
            top: "24px",
            left: "50%",
            transform: "translate(-50%, -140%)",
            zIndex: "99999",
            minWidth: "260px",
            maxWidth: "calc(100vw - 32px)",
            padding: "14px 20px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily:
                "var(--font-body-en, Arial, sans-serif)",
            boxShadow:
                "0 10px 30px rgba(0, 0, 0, 0.12)",
            transition:
                "transform 0.3s ease, opacity 0.3s ease",
            opacity: "0",
            background:
                type === "success"
                    ? "var(--color-mauve-dusty)"
                    : "var(--color-error)",
            color: "var(--color-white)"
        });

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform =
                "translate(-50%, 0)";
            toast.style.opacity = "1";
        });

        setTimeout(() => {
            toast.style.transform =
                "translate(-50%, -140%)";
            toast.style.opacity = "0";

            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2500);
    };

    const loadSharedCart = () => {
        try {
            const cart =
                JSON.parse(
                    localStorage.getItem("laxura-cart")
                );

            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            return [];
        }
    };

    const saveSharedCart = (cart) => {
        localStorage.setItem(
            "laxura-cart",
            JSON.stringify(cart)
        );

        window.dispatchEvent(
            new CustomEvent("laxura-cart-updated", {
                detail: cart
            })
        );
    };

    const updateCartBadge = () => {
        const cart = loadSharedCart();

        const count = cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

        document
            .querySelectorAll(
                "[data-cart-count], #cartCount, .cart-count"
            )
            .forEach((element) => {
                element.textContent = String(count);

                element.hidden = count === 0;
            });
    };

    const createPage = () => {
        if (!root) {
            return;
        }

        root.innerHTML = `
            <main class="plp-page">
                <section class="plp-header">
                    <div class="plp-header__content">
                        <h1
                            class="plp-header__title"
                            id="plpTitle"
                        ></h1>

                        <p
                            class="plp-header__description"
                            id="plpDescription"
                        ></p>
                    </div>
                </section>

                <section class="plp-products">
                    <div
                        class="product-grid"
                        id="productGrid"
                    ></div>
                </section>
            </main>

            <div
                class="cart-drawer-overlay"
                id="cartOverlay"
                aria-hidden="true"
            ></div>

            <aside
                class="cart-drawer"
                id="cartDrawer"
                aria-hidden="true"
            ></aside>
        `;
    };

    const createProductCard = (product) => {
        const article = document.createElement("article");

        article.className = "product-card";

        const image = getProductImage(product);
        const title = getProductTitle(product);
        const price = getProductPriceNumber(product);
        const oldPrice = Number(product?.oldPrice) || 0;

        article.innerHTML = `
            <div class="product-card__image-wrap">
                <img
                    class="product-card__image"
                    src="${image}"
                    alt="${title}"
                    loading="lazy"
                />
            </div>

            <div class="product-card__content">
                <h3 class="product-card__title">
                    ${title}
                </h3>

                <div class="product-card__price">
                    <span class="product-card__price-current">
                        ${formatPrice(price)}
                    </span>

                    ${
                        oldPrice > price
                            ? `
                                <span class="product-card__price-old">
                                    ${formatPrice(oldPrice)}
                                </span>
                            `
                            : ""
                    }
                </div>

                ${
                    product?.badge
                        ? `
                            <span class="product-card__badge">
                                ${product.badge}
                            </span>
                        `
                        : ""
                }

                <div class="product-card__details">
                    <a
                        href="${product?.productUrl || "#"}"
                        class="product-card__details-link"
                        data-product-url
                    >
                        ${getText("viewDetails")}
                    </a>

                    <button
                        type="button"
                        class="product-card__cart-button"
                        data-add-to-cart
                    >
                        ${getText("addToCart")}
                    </button>
                </div>
            </div>
        `;

        const detailsLink =
            article.querySelector(
                "[data-product-url]"
            );

        if (detailsLink && !product?.productUrl) {
            detailsLink.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                }
            );
        }

        const addButton =
            article.querySelector(
                "[data-add-to-cart]"
            );

        if (addButton) {
            addButton.addEventListener(
                "click",
                () => {
                    addToCart(product);
                }
            );
        }

        return article;
    };

    const renderProducts = (items = products) => {
        const grid =
            document.getElementById(
                "productGrid"
            );

        if (!grid) {
            return;
        }

        grid.innerHTML = "";

        filteredProducts = Array.isArray(items)
            ? items
            : [];

        if (!filteredProducts.length) {
            grid.innerHTML = `
                <div class="product-grid__empty">
                    ${getText("noProducts")}
                </div>
            `;

            return;
        }

        filteredProducts.forEach((product) => {
            grid.appendChild(
                createProductCard(product)
            );
        });

        applyResponsiveGrid();
    };

    const applyResponsiveGrid = () => {
        const grid =
            document.getElementById(
                "productGrid"
            );

        if (!grid) {
            return;
        }

        const width = window.innerWidth;

        if (width <= 576) {
            grid.style.gridTemplateColumns =
                "repeat(2, minmax(0, 1fr))";
        } else if (width <= 900) {
            grid.style.gridTemplateColumns =
                "repeat(2, minmax(0, 1fr))";
        } else {
            grid.style.gridTemplateColumns =
                "repeat(4, minmax(0, 1fr))";
        }
    };

    const updateLanguage = () => {
        const title =
            document.getElementById(
                "plpTitle"
            );

        const description =
            document.getElementById(
                "plpDescription"
            );

        if (title) {
            title.textContent =
                getText("title");
        }

        if (description) {
            description.textContent =
                getText("description");
        }

        renderProducts(filteredProducts.length
            ? filteredProducts
            : products
        );

        renderCart();
    };

    const setupSearch = () => {
        const searchInput =
            document.querySelector(
                "[data-product-search], #productSearch"
            );

        if (!searchInput) {
            return;
        }

        searchInput.addEventListener(
            "input",
            (event) => {
                const query =
                    event.target.value
                        .trim()
                        .toLowerCase();

                if (!query) {
                    renderProducts(products);
                    return;
                }

                const results =
                    products.filter((product) => {
                        const title =
                            getProductTitle(
                                product
                            ).toLowerCase();

                        const category =
                            String(
                                product?.category || ""
                            ).toLowerCase();

                        return (
                            title.includes(query) ||
                            category.includes(query)
                        );
                    });

                renderProducts(results);
            }
        );
    };

    const setupLanguageSwitcher = () => {
        document
            .querySelectorAll(
                "[data-language]"
            )
            .forEach((button) => {
                button.addEventListener(
                    "click",
                    () => {
                        const language =
                            button.dataset.language;

                        if (!language) {
                            return;
                        }

                        currentLanguage =
                            language;

                        localStorage.setItem(
                            "sale-language",
                            currentLanguage
                        );

                        updateLanguage();
                    }
                );
            });
    };

    const setupResize = () => {
        window.addEventListener(
            "resize",
            applyResponsiveGrid
        );
    };

    const createCartDrawer = () => {
        const drawer =
            document.getElementById(
                "cartDrawer"
            );

        const overlay =
            document.getElementById(
                "cartOverlay"
            );

        if (!drawer || !overlay) {
            return;
        }

        drawer.innerHTML = `
            <div class="cart-drawer__header">
                <h2 class="cart-drawer__title">
                    ${getText("cart")}
                </h2>

                <button
                    type="button"
                    class="cart-drawer__close"
                    id="cartDrawerClose"
                    aria-label="${getText("close")}"
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
                    <span>
                        ${getText("subtotal")}
                    </span>

                    <strong id="cartSubtotal">
                        0
                    </strong>
                </div>

                <button
                    type="button"
                    class="cart-drawer__checkout"
                    id="cartCheckout"
                >
                    ${getText("checkout")}
                </button>
            </div>
        `;

        document
            .getElementById(
                "cartDrawerClose"
            )
            ?.addEventListener(
                "click",
                closeCart
            );

        overlay.addEventListener(
            "click",
            closeCart
        );

        document
            .getElementById(
                "cartCheckout"
            )
            ?.addEventListener(
                "click",
                () => {
                    showToast(
                        "success",
                        getText("checkoutMessage")
                    );
                }
            );

        renderCart();
    };

    const addToCart = (product) => {
        if (!product) {
            return;
        }

        const cart = loadSharedCart();

        const existingItem =
            cart.find(
                (item) =>
                    String(item.id) ===
                        String(product.id) &&
                    String(item.category) ===
                        CATEGORY
            );

        if (existingItem) {
            existingItem.quantity =
                Number(existingItem.quantity || 0) +
                1;
        } else {
            cart.push({
                id: product.id,
                category: CATEGORY,
                product: product,
                quantity: 1
            });
        }

        saveSharedCart(cart);
        updateCartBadge();
        renderCart();
        openCart();

        showToast(
            "success",
            getText("addedToCart")
        );
    };

    const removeFromCart = (productId) => {
        const cart = loadSharedCart();

        const updatedCart =
            cart.filter(
                (item) =>
                    !(
                        String(item.id) ===
                            String(productId) &&
                        String(item.category) ===
                            CATEGORY
                    )
            );

        saveSharedCart(updatedCart);
        updateCartBadge();
        renderCart();
    };

    const changeQuantity = (
        productId,
        delta
    ) => {
        const cart = loadSharedCart();

        const item =
            cart.find(
                (cartItem) =>
                    String(cartItem.id) ===
                        String(productId) &&
                    String(cartItem.category) ===
                        CATEGORY
            );

        if (!item) {
            return;
        }

        item.quantity =
            Number(item.quantity || 0) +
            delta;

        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        saveSharedCart(cart);
        updateCartBadge();
        renderCart();
    };

    const calculateSubtotal = (cart) => {
        return cart.reduce(
            (total, item) => {
                const product =
                    item.product || {};

                return (
                    total +
                    getProductPriceNumber(
                        product
                    ) *
                        Number(
                            item.quantity || 0
                        )
                );
            },
            0
        );
    };

    const renderCart = () => {
        const cartItems =
            document.getElementById(
                "cartItems"
            );

        const subtotal =
            document.getElementById(
                "cartSubtotal"
            );

        if (!cartItems || !subtotal) {
            return;
        }

        const cart = loadSharedCart().filter(
            (item) =>
                String(item.category) ===
                CATEGORY
        );

        if (!cart.length) {
            cartItems.innerHTML = `
                <div class="cart-drawer__empty">
                    ${getText("emptyCart")}
                </div>
            `;

            subtotal.textContent =
                formatPrice(0);

            return;
        }

        cartItems.innerHTML = "";

        cart.forEach((item) => {
            const product =
                item.product || {};

            const itemElement =
                document.createElement(
                    "div"
                );

            itemElement.className =
                "cart-item";

            const title =
                getProductTitle(product);

            const image =
                getProductImage(product);

            const price =
                getProductPriceNumber(
                    product
                );

            itemElement.innerHTML = `
                <div class="cart-item__image-wrap">
                    <img
                        class="cart-item__image"
                        src="${image}"
                        alt="${title}"
                    />
                </div>

                <div class="cart-item__info">
                    <h3 class="cart-item__title">
                        ${title}
                    </h3>

                    <span class="cart-item__price">
                        ${formatPrice(price)}
                    </span>
                </div>

                <div class="cart-item__actions">
                    <div class="cart-item__quantity">
                        <button
                            type="button"
                            class="cart-item__quantity-button"
                            data-minus
                        >
                            −
                        </button>

                        <span class="cart-item__quantity-value">
                            ${item.quantity}
                        </span>

                        <button
                            type="button"
                            class="cart-item__quantity-button"
                            data-plus
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        class="cart-item__remove"
                        data-remove
                    >
                        ${getText("remove")}
                    </button>
                </div>
            `;

            itemElement
                .querySelector("[data-minus]")
                ?.addEventListener(
                    "click",
                    () =>
                        changeQuantity(
                            item.id,
                            -1
                        )
                );

            itemElement
                .querySelector("[data-plus]")
                ?.addEventListener(
                    "click",
                    () =>
                        changeQuantity(
                            item.id,
                            1
                        )
                );

            itemElement
                .querySelector("[data-remove]")
                ?.addEventListener(
                    "click",
                    () =>
                        removeFromCart(
                            item.id
                        )
                );

            cartItems.appendChild(
                itemElement
            );
        });

        subtotal.textContent =
            formatPrice(
                calculateSubtotal(cart)
            );
    };

    const openCart = () => {
        const drawer =
            document.getElementById(
                "cartDrawer"
            );

        const overlay =
            document.getElementById(
                "cartOverlay"
            );

        if (!drawer || !overlay) {
            return;
        }

        drawer.classList.add("is-open");
        overlay.classList.add("is-open");

        drawer.setAttribute(
            "aria-hidden",
            "false"
        );

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "cart-is-open"
        );
    };

    const closeCart = () => {
        const drawer =
            document.getElementById(
                "cartDrawer"
            );

        const overlay =
            document.getElementById(
                "cartOverlay"
            );

        if (!drawer || !overlay) {
            return;
        }

        drawer.classList.remove(
            "is-open"
        );

        overlay.classList.remove(
            "is-open"
        );

        drawer.setAttribute(
            "aria-hidden",
            "true"
        );

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "cart-is-open"
        );
    };

    const setupEscapeKey = () => {
        document.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Escape"
                ) {
                    closeCart();
                }
            }
        );
    };

    const applyCartStyles = () => {
        if (
            document.getElementById(
                "clothesCartRuntimeStyles"
            )
        ) {
            return;
        }

        const style =
            document.createElement(
                "style"
            );

        style.id =
            "clothesCartRuntimeStyles";

        style.textContent = `
.cart-drawer-overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,.28);
opacity:0;
visibility:hidden;
pointer-events:none;
transition:opacity .25s ease,visibility .25s ease;
z-index:9990;
}

.cart-drawer-overlay.is-open{
opacity:1;
visibility:visible;
pointer-events:auto;
}

.cart-drawer{
position:fixed;
top:0;
right:0;
width:min(420px,92vw);
height:100%;
background:var(--color-surface);
box-shadow:-10px 0 30px rgba(0,0,0,.12);
transform:translateX(100%);
transition:transform .3s ease;
z-index:9991;
display:flex;
flex-direction:column;
}

.cart-drawer.is-open{
transform:translateX(0);
}

.cart-drawer__header{
display:flex;
align-items:center;
justify-content:space-between;
gap:var(--space-4);
padding:var(--space-5);
border-bottom:1px solid var(--color-border);
flex-shrink:0;
}

.cart-drawer__title{
margin:0;
color:var(--color-text-primary);
font-family:var(--font-heading-en);
font-size:var(--fs-h3);
}

.cart-drawer__close{
width:36px;
height:36px;
padding:0;
border:none;
background:transparent;
color:var(--color-text-primary);
cursor:pointer;
font-size:28px;
line-height:1;
}

.cart-drawer__body{
flex:1;
overflow-y:auto;
padding:var(--space-4);
}

.cart-drawer__empty{
display:flex;
align-items:center;
justify-content:center;
min-height:180px;
color:var(--color-text-secondary);
font-family:var(--font-body-en);
font-size:var(--fs-body);
text-align:center;
}

.cart-item{
display:grid;
grid-template-columns:72px minmax(0,1fr);
gap:var(--space-3);
padding:var(--space-4) 0;
border-bottom:1px solid var(--color-border);
}

.cart-item__image-wrap{
width:72px;
aspect-ratio:1;
overflow:hidden;
border-radius:var(--radius-sm);
background:var(--color-surface-alt);
}

.cart-item__image{
width:100%;
height:100%;
object-fit:cover;
display:block;
}

.cart-item__info{
min-width:0;
}

.cart-item__title{
margin:0 0 var(--space-2);
color:var(--color-text-primary);
font-family:var(--font-body-en);
font-size:var(--fs-body-sm);
font-weight:var(--fw-semibold);
}

.cart-item__price{
color:var(--color-mauve-deep);
font-family:var(--font-body-en);
font-size:var(--fs-body-sm);
font-weight:var(--fw-bold);
}

.cart-item__actions{
grid-column:2;
display:flex;
align-items:center;
justify-content:space-between;
gap:var(--space-3);
width:100%;
}

.cart-item__quantity{
display:flex;
align-items:center;
gap:8px;
}

.cart-item__quantity-button{
width:32px;
height:32px;
padding:0;
border:none;
border-radius:var(--radius-sm);
background:var(--color-mauve-dusty);
color:var(--color-white);
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
font-size:18px;
line-height:1;
}

.cart-item__quantity-value{
min-width:20px;
text-align:center;
color:var(--color-text-primary);
font-family:var(--font-body-en);
font-size:var(--fs-body-sm);
font-weight:var(--fw-semibold);
}

.cart-item__remove{
padding:0;
border:none;
background:transparent;
color:var(--color-error);
cursor:pointer;
font-family:var(--font-body-en);
font-size:var(--fs-caption);
}

.cart-drawer__footer{
flex-shrink:0;
padding:var(--space-5);
border-top:1px solid var(--color-border);
background:var(--color-surface);
}

.cart-drawer__subtotal{
display:flex;
align-items:center;
justify-content:space-between;
gap:var(--space-4);
margin-bottom:var(--space-4);
color:var(--color-text-primary);
font-family:var(--font-body-en);
}

.cart-drawer__subtotal strong{
color:var(--color-mauve-deep);
font-weight:var(--fw-bold);
}

.cart-drawer__checkout{
width:100%;
height:48px;
border:none;
border-radius:var(--radius-sm);
background:var(--color-mauve-dusty);
color:var(--color-white);
cursor:pointer;
font-family:var(--font-heading-en);
font-size:var(--fs-body);
font-weight:var(--fw-semibold);
}

body.cart-is-open{
overflow:hidden;
}

@media(max-width:768px){
.cart-drawer{
width:min(92vw,420px);
}

.cart-drawer__header{
padding:var(--space-4);
}

.cart-drawer__body{
padding:var(--space-3);
}

.cart-drawer__footer{
padding:var(--space-4);
}

.cart-item{
grid-template-columns:64px minmax(0,1fr);
gap:var(--space-3);
}

.cart-item__image-wrap{
width:64px;
}

.cart-item__actions{
grid-column:2;
flex-direction:row;
align-items:center;
justify-content:space-between;
width:100%;
height:auto;
}
}

@media(max-width:480px){
.cart-drawer{
width:100vw;
max-width:100vw;
}

.cart-item{
grid-template-columns:60px minmax(0,1fr);
}

.cart-item__image-wrap{
width:60px;
}
}
`;

        document.head.appendChild(style);
    };

    const init = () => {
        if (!Array.isArray(window.products)) {
            console.error(
                "Product data was not found."
            );
            return;
        }

        if (
            !window.translations ||
            typeof window.translations !==
                "object"
        ) {
            console.error(
                "Translation data was not found."
            );
            return;
        }

        products = window.products;
        translations =
            window.translations;

        const savedLanguage =
            localStorage.getItem(
                "sale-language"
            );

        if (
            savedLanguage &&
            translations[savedLanguage]
        ) {
            currentLanguage =
                savedLanguage;
        }

        createPage();
        createCartDrawer();
        applyCartStyles();
        setupSearch();
        setupLanguageSwitcher();
        setupResize();
        setupEscapeKey();
        updateLanguage();
        updateCartBadge();
        applyResponsiveGrid();
    };

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            init
        );
    } else {
        init();
    }
})();