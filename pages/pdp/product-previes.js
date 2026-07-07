import { pdpProducts } from "./pdp-data.js";


const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));


const product = pdpProducts.find(
    item => item.id === id
);


console.log("SELECTED PRODUCT:", product);