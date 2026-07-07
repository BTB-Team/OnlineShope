import { skincareProducts } from "./beauty-p-data.js";

const productGrid = document.getElementById("productGrid");


productGrid.innerHTML = skincareProducts.map(product => `

<article class="product-card" data-id="${product.id}">

    <div class="product-card__media">

        <img
            class="product-card__image"
            src="${product.image}"
            alt="${product.title}">

        <span class="product-card__badge">
            ${product.badge}
        </span>

        <button
            class="product-card__floating-cart"
            aria-label="Add to cart">
        </button>

    </div>


    <div class="product-card__content">

        <h3 class="product-card__title">
            ${product.title}
        </h3>


        <div class="product-card__price">

            <span class="product-card__old-price number">
                $${product.oldPrice}
            </span>


            <span class="product-card__new-price number">
                $${product.newPrice}
            </span>

        </div>


        <div class="product-card__details btn btn-ghost">
    <a href="../../../pdp/pdp.html?id=${product.id}">
    View Details →
</a>
        

</div>


    </div>

</article>

`).join("");
