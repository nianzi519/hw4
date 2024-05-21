async function addProduct() {
    const date = document.getElementById('date').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const response = await fetch('/add_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, name, price }),
    });

    const result = await response.json();
    alert(result.status);
}

async function searchProducts() {
    const query = document.getElementById('search').value;

    const response = await fetch('/search_products?query=' + query);
    const products = await response.json();

    const results = document.getElementById('results');
    results.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.textContent = `日期: ${product.date}, 商品: ${product.name}, 價格: ${product.price}`;
        results.appendChild(item);
    });
}
