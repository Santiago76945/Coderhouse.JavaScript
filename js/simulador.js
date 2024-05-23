/*Esto es un simulador de costo total de distintos productos. El código utiliza varias funciones para estructurar las operaciones, como por ejemplo:

addProduct: Que valida y agrega productos al arreglo products.

updateProductList: Actualiza la lista de productos en la interfaz de usuario.

calculateTotalCost: Calcula el costo total de los productos. */

//este es mi simulador.js

// Arreglo para almacenar los productos
const products = [];

// Función para agregar un producto al arreglo
function addProduct() {
    const productInput = document.getElementById('product');
    const priceInput = document.getElementById('price');
    const product = productInput.value;
    const price = parseFloat(priceInput.value);

    // Este es el condicional que requeria el desafio entregable. Este condicional verifica que el nombre del producto no esté vacío, que el precio sea un número válido y mayor que cero. Si alguna de estas condiciones no se cumple, se muestra una alerta al usuario.
    if (product && !isNaN(price) && price > 0) {
        products.push({ name: product, price: price });
        updateProductList();
        calculateTotalCost();
    } else {
        alert('Por favor, ingrese un producto válido y un precio positivo.');
    }

    productInput.value = '';
    priceInput.value = '';
}

// Función para actualizar la lista de productos en la interfaz
function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productList.appendChild(listItem);
    });
}

// Función para calcular el costo total de los productos
function calculateTotalCost() {
    let totalCost = 0;
    // Aqui usamos un ciclo "for" para calcular el costo total de los productos en la función "calculateTotalCost"
    for (const product of products) {
        totalCost += product.price;
    }

    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = totalCost.toFixed(2);
}


