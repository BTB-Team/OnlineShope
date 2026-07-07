import { pdpProducts } from "./pdp-data.js";


const params = new URLSearchParams(
    window.location.search
);


const productId = Number(
    params.get("id")
);


const product = pdpProducts.find(
    item => item.id === productId
);



if (!product) {

    console.error("Product not found");

} else {


    document.getElementById("breadcrumbTitle").textContent =
    product.title;


    document.getElementById("pdpCategory").textContent =
    product.category;


    document.getElementById("pdpTitle").textContent =
    product.title;


    document.getElementById("pdpOldPrice").textContent =
    `$${product.oldPrice}`;


    document.getElementById("pdpPrice").textContent =
    `$${product.price}`;


    document.getElementById("pdpDescription").textContent =
    product.description;


    document.getElementById("description").textContent =
    product.description;



    const mainImage =
    document.getElementById("pdpMainImage");


    mainImage.src =
    product.images[0];


    mainImage.alt =
    product.title;



    const thumbnails =
    document.getElementById("pdpThumbnails");


    thumbnails.innerHTML =
    product.images.map((image,index)=>`

        <img
        src="${image}"
        alt="${product.title}"
        class="${index === 0 ? "active" : ""}"
        >

    `).join("");



    thumbnails
    .querySelectorAll("img")
    .forEach(image=>{


        image.addEventListener(
            "click",
            ()=>{

                mainImage.src = image.src;

            }
        );


    });



    const specs =
    document.getElementById("specifications");


    specs.innerHTML =
    Object.entries(product.specifications)
    .map(([key,value])=>`

        <tr>

            <th>${key}</th>

            <td>${value}</td>

        </tr>

    `)
    .join("");

}