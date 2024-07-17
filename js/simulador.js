const products = JSON.parse(localStorage.getItem('products')) || [];
let availableProducts = [];
let productsChart;

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

function populateProductSelect(products) {
    const productSelect = document.getElementById('product-select');
    productSelect.innerHTML = '';

    products.forEach((product, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productSelect.appendChild(option);
    });
}

function getProductFromSelect() {
    const selectedIndex = document.getElementById('product-select').value;
    const selectedProduct = availableProducts[selectedIndex];
    return new Product(selectedProduct.name, selectedProduct.price);
}

function addProduct() {
    const product = getProductFromSelect();

    validateAndAddProduct(product)
        .then(() => {
            updateProductList();
            calculateTotalCost();
            saveProductsToLocalStorage();
        })
        .catch(error => {
            alert(error.message);
        });
}

function validateAndAddProduct(product) {
    return new Promise((resolve, reject) => {
        if (product.name && !isNaN(product.price) && product.price > 0) {
            products.push(product);
            resolve();
        } else {
            reject(new Error('Por favor, seleccione un producto válido.'));
        }
    });
}

function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        productList.appendChild(listItem);
    });

    generateChart();
}

function calculateTotalCost() {
    let totalCost = 0;
    for (const product of products) {
        totalCost += product.price;
    }
    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = totalCost.toFixed(2);
}

function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function toggleDarkMode() {
    document.body.classList.toggle('modo-obscuro');
    const toggleButton = document.getElementById('toggle-dark-mode');
    if (document.body.classList.contains('modo-obscuro')) {
        toggleButton.textContent = 'Modo Claro';
    } else {
        toggleButton.textContent = 'Modo Oscuro';
    }
}

function clearFormAndStorage() {
    localStorage.removeItem('products');
    products.length = 0;
    updateProductList();
    calculateTotalCost();
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            availableProducts = data;
            populateProductSelect(availableProducts);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

function generateChart() {
    const ctx = document.getElementById('productsChart').getContext('2d');
    
    if (productsChart) {
        productsChart.destroy();
    }

    const chartData = products.map(product => product.price);
    const chartLabels = products.map(product => product.name);

    productsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Precios de Productos',
                data: chartData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

updateProductList();
calculateTotalCost();










