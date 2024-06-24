//Array para almacenar los productos, inicializado desde localStorage utilizando JSON
const products = JSON.parse(localStorage.getItem('products')) || [];

// Constructor que va a crear cada producto que el usuario ingrese
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Función para capturar entradas del formulario
function getProductFromForm() {
    const name = document.getElementById('product').value;
    const price = parseFloat(document.getElementById('price').value);
    return new Product(name, price);
}

// Función para agregar un producto al contructor
function addProduct() {
    const product = getProductFromForm();
    
    // Requisitos if que deben cumplirse para poder ser agregados que devuelve un alert si no se cumplen
    if (product.name && !isNaN(product.price) && product.price > 0) {
        products.push(product);
        updateProductList();
        calculateTotalCost();
        clearForm();
        saveProductsToLocalStorage();
    } else {
        alert('Por favor, ingrese un producto válido y un precio positivo.');
    }
}

// Función para actualizar la lista de productos en la interfaz
function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productList.appendChild(listItem);
    });
}

// Función para calcular el costo total de los productos
function calculateTotalCost() {
    let totalCost = 0;

    for (const product of products) {
        totalCost += product.price;
    }

    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = totalCost.toFixed(2);
}

// Función para limpiar el formulario después de agregar un producto
function clearForm() {
    document.getElementById('product-form').reset();
}

// Función para guardar los productos en el local storage
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Función para alternar el modo oscuro / modo claro
function toggleDarkMode() {
    document.body.classList.toggle('modo-obscuro');
    const toggleButton = document.getElementById('toggle-dark-mode');
    if (document.body.classList.contains('modo-obscuro')) {
        toggleButton.textContent = 'Modo Claro';
    } else {
        toggleButton.textContent = 'Modo Oscuro';
    }
}

// Función para borrar todos los productos del fomulario del local storage
function clearFormAndStorage() {
    localStorage.removeItem('products');
    products.length = 0; // Vacía el arreglo de productos
    updateProductList();
    calculateTotalCost();
    clearForm();
}

updateProductList();
calculateTotalCost();







