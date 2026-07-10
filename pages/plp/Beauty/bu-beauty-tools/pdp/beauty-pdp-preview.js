import {
    beautyPdpData
} from "./beauty-pdp-data.js";


import {
    getProductTitle,
    getProductDescription,
    formatPrice,
    initializeLanguage,
    toggleLanguage,
    translate,
    getLanguage
} from "./beauty-pdp-i18n.js";

import {
    beautyProducts
} from "../beauty-products-data.js";



// ================= CONSTANT =================

const CART_KEY = "beautyCart";



// ================= PRODUCT =================

const urlParams =
new URLSearchParams(
    window.location.search
);


const productId =
urlParams.get("id");



const product =
beautyProducts.find(
    item =>
        String(item.id) ===
        String(productId)
);


const productDetails =
beautyPdpData[productId];



if(!product){

    window.location.href =
    "../beauty-products.html";

}




console.log(
    "PDP PRODUCT:",
    product
);



// ================= DOM =================


const mainImage =
document.getElementById(
    "mainImage"
);



const thumbnails =
document.getElementById(
    "thumbnails"
);



const productTitle =
document.getElementById(
    "productTitle"
);



const productSubtitle =
document.getElementById(
    "productSubtitle"
);



const productDescription =
document.getElementById(
    "productDescription"
);



const productCategory =
document.getElementById(
    "productCategory"
);



const currentPrice =
document.getElementById(
    "currentPrice"
);



const oldPrice =
document.getElementById(
    "oldPrice"
);



const specificationsTable =
document.getElementById(
    "specificationsTable"
);



const breadcrumbTitle =
document.getElementById(
    "breadcrumbTitle"
);



const addToCartBtn =
document.getElementById(
    "addToCartBtn"
);

const languageSwitcher =
document.getElementById(
    "languageSwitcher"
);


// ================= CART DOM =================


const toastContainer =
document.getElementById(
    "toastContainer"
);



const cartDrawer =
document.getElementById(
    "cartDrawer"
);



const cartOverlay =
document.getElementById(
    "cartOverlay"
);



const cartClose =
document.getElementById(
    "cartClose"
);



const cartItems =
document.getElementById(
    "cartItems"
);



const cartSubtotal =
document.getElementById(
    "cartSubtotal"
);



const emptyCart =
document.getElementById(
    "emptyCart"
);





// ================= GALLERY =================


function renderGallery(){


    thumbnails.innerHTML = "";



    const images =
    productDetails?.images ||
    [
        product.image
    ];



    mainImage.src =
    images[0];



    images.forEach(
        (image,index)=>{


            const thumbnail =
            document.createElement(
                "img"
            );


            thumbnail.src =
            image;



            thumbnail.alt =
            getProductTitle(
                product
            );



            thumbnail.className =
            "pdp-thumbnail";



            if(index === 0){

                thumbnail.classList.add(
                    "active"
                );

            }



            thumbnail.addEventListener(
                "click",
                ()=>{


                    mainImage.src =
                    image;



                    document
                    .querySelectorAll(
                        ".pdp-thumbnail"
                    )
                    .forEach(
                        item=>{

                            item.classList.remove(
                                "active"
                            );

                        }
                    );



                    thumbnail.classList.add(
                        "active"
                    );


                }
            );



            thumbnails.appendChild(
                thumbnail
            );


        }
    );


}






// ================= PRODUCT INFO =================


function renderInfo(){


    productTitle.textContent =
    getProductTitle(
        product
    );



    productSubtitle.textContent =
    getProductDescription(
        product
    );



    productDescription.textContent =
    getProductDescription(
        product
    );




    breadcrumbTitle.textContent =
    getProductTitle(
        product
    );



    currentPrice.textContent =
    formatPrice(
        product.price
    );



    oldPrice.textContent =
    product.oldPrice
    ?
    formatPrice(
        product.oldPrice
    )
    :
    "";

}






// ================= SPECIFICATIONS =================


function renderSpecifications(){


    specificationsTable.innerHTML =
    "";



    const specifications =
    productDetails?.specifications ||
    [];



    if(
        specifications.length === 0
    ){

        specificationsTable.innerHTML = `

        <tr>

            <td colspan="2">
                No specifications available
            </td>

        </tr>

        `;


        return;

    }



    const language =
    document.documentElement.lang;



    specifications.forEach(
        item=>{


            const row =
            document.createElement(
                "tr"
            );



            row.innerHTML = `

            <td>
                ${item.name[language]}
            </td>


            <td>
                ${item.value[language]}
            </td>

            `;



            specificationsTable.appendChild(
                row
            );


        }
    );


}

// ================= CART =================


function addToCart(){


    let cart =
    JSON.parse(
        localStorage.getItem(
            CART_KEY
        )
    ) || [];



    const existingProduct =
    cart.find(
        item =>
        item.id === product.id
    );



    if(existingProduct){


        existingProduct.quantity += 1;


    } else {


        cart.push({

            id: product.id,

            title: product.title,

            price: product.price,

            image: product.image,

            quantity: 1

        });


    }



    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );



    renderCart();


    openCart();



    showToast(
    translate("addedToCart")
);


}






// ================= CART DRAWER =================


function openCart(){


    cartDrawer.classList.add(
        "active"
    );


    cartOverlay.classList.add(
        "active"
    );


}




function closeCart(){


    cartDrawer.classList.remove(
        "active"
    );


    cartOverlay.classList.remove(
        "active"
    );


}






function renderCart(){


    const cart =
    JSON.parse(
        localStorage.getItem(
            CART_KEY
        )
    ) || [];



    cartItems.innerHTML =
    "";



    if(cart.length === 0){

    emptyCart.style.display = "block";

    cartSubtotal.textContent =
    formatPrice(0);

    return;

}


emptyCart.style.display = "none";



    let total = 0;



    cart.forEach(
        item=>{


            total +=
            item.price *
            item.quantity;



            const cartItem =
            document.createElement(
                "div"
            );



            cartItem.className =
            "cart-item";



            cartItem.innerHTML = `


            <img

            class="cart-item__image"

            src="${item.image}"

            alt="">




            <div class="cart-item__content">


                <h3 class="cart-item__title">

                    ${
                item.title[getLanguage()]
                ||
                item.title.en
            }

                </h3>



                <span class="cart-item__price number">

                    ${formatPrice(item.price)}

                </span>


            </div>





            <div class="cart-item__actions">



                <div class="cart-qty">


                    <button

                    class="cart-minus"

                    data-id="${item.id}">

                        -

                    </button>



                    <span class="number">

                        ${item.quantity}

                    </span>



                    <button

                    class="cart-plus"

                    data-id="${item.id}">

                        +

                    </button>


                </div>




                <button
                    class="cart-remove"
                    data-id="${item.id}">

                    ${translate("remove")}

                </button>


            </div>


            `;



            cartItems.appendChild(
                cartItem
            );


        }
    );



    cartSubtotal.textContent =
    `$${total.toFixed(2)}`;


}
// ================= UPDATE QUANTITY =================


function updateQuantity(
    id,
    change
){


    let cart =
    JSON.parse(
        localStorage.getItem(
            CART_KEY
        )
    ) || [];



    const item =
    cart.find(
        product =>
        product.id === id
    );



    if(item){


        item.quantity += change;



        if(item.quantity <= 0){


            cart =
            cart.filter(
                product =>
                product.id !== id
            );


        }


    }



    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );



    renderCart();



}





// ================= REMOVE =================


function removeFromCart(
    id
){


    let cart =
    JSON.parse(
        localStorage.getItem(
            CART_KEY
        )
    ) || [];



    cart =
    cart.filter(
        item =>
        item.id !== id
    );



    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );



    renderCart();



    showToast(
        "Product removed from cart"
    );


}






// ================= TOAST =================


function showToast(
    message
){


    const toast =
    document.createElement(
        "div"
    );



    toast.className =
    "toast toast-success";



    toast.innerHTML = `


        <span class="toast__icon">

            ✓

        </span>



        <span class="toast__message">

            ${message}

        </span>


    `;



    toastContainer.appendChild(
        toast
    );



    setTimeout(
        ()=>{


            toast.remove();


        },
        3000
    );


}






// ================= CART EVENTS =================


function handleCartActions(
    event
){


    const button =
    event.target.closest(
        "button"
    );



    if(!button){

        return;

    }



    const id =
    Number(
        button.dataset.id
    );



    if(
        button.classList.contains(
            "cart-plus"
        )
    ){


        updateQuantity(
            id,
            1
        );


    }




    if(
        button.classList.contains(
            "cart-minus"
        )
    ){


        updateQuantity(
            id,
            -1
        );


    }




    if(
        button.classList.contains(
            "cart-remove"
        )
    ){


        removeFromCart(
            id
        );


    }


}
// ================= INIT =================


function init(){


    initializeLanguage();

    renderStaticTexts();

    renderInfo();

    renderStaticTexts();

    renderGallery();


    renderSpecifications();


    renderCart();



    addToCartBtn.addEventListener(
        "click",
        addToCart
    );



    if(languageSwitcher){

        languageSwitcher.textContent =
            document.documentElement.lang
            .toUpperCase();



        languageSwitcher.addEventListener(
            "click",
            ()=>{


                toggleLanguage();


                location.reload();


            }
        );

    }

    


}



// ================= EVENTS =================


cartClose.addEventListener(
    "click",
    closeCart
);



cartOverlay.addEventListener(
    "click",
    closeCart
);



cartItems.addEventListener(
    "click",
    handleCartActions
);




// ================= START =================
function renderStaticTexts(){

    homeText.textContent =
    translate("home");

    beautyText.textContent =
    translate("beauty");

    descriptionTitle.textContent =
    translate("description");

    specificationsTitle.textContent =
    translate("specifications");

    productCategory.textContent =
    translate("collection");

    addToCartBtn.textContent =
    translate("addToCart");

    cartTitle.textContent =
    translate("yourCart");

    subtotalTitle.textContent =
    translate("subtotal");

    cartCheckout.textContent =
    translate("checkout");

    emptyCart.textContent =
    translate("emptyCart");

    languageSwitcher.textContent =
    getLanguage().toUpperCase();

}

init();
