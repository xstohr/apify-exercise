const fetch = require('node-fetch');

const API_URL = 'https://api.ecommerce.com/products';

scrapeProducts();

const fetchProducts = async (min, max) => {
    const url = `${API_URL}?minPrice=${min}&maxPrice=${max}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

let minPrice = 0;
let maxPrice = 100000;
let products = [];


const scrapeProducts = async () => {
    while (true) {
        const data = await fetchProducts(minPrice, maxPrice);
        const count = data.count;
        products = products.concat(data.products);

        if (count < 1000) {
            break;
        }

        minPrice = data.products[data.products.length - 1].price +1;
    }
}