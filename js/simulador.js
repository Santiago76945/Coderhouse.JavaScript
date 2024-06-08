// Arreglo para almacenar los productos
const products = [];

// Clase para crear objetos de producto
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Función para capturar entradas
function promptProduct() {
    const name = prompt("Ingrese el nombre del producto:");
    const price = parseFloat(prompt("Ingrese el precio del producto:"));
    return new Product(name, price);
}

// Función para agregar un producto al arreglo
function addProduct() {
    const product = promptProduct();
    
    // Este es el condicional que verifica que el nombre del producto no esté vacío, que el precio sea un número válido y mayor que cero.
    if (product.name && !isNaN(product.price) && product.price > 0) {
        products.push(product);
        updateProductList();
        calculateTotalCost();
    } else {
        alert('Por favor, ingrese un producto válido y un precio positivo.');
    }
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

// Variables y objetos necesarios
const sampleProduct1 = new Product("Manzana", 1.5);
const sampleProduct2 = new Product("Naranja", 2.0);

// Agregar productos de muestra para demostración
products.push(sampleProduct1, sampleProduct2);
updateProductList();
calculateTotalCost();



