
const categories = new Set();
const products = [
    {id:1, name:"Product A", price:100, category:"Electronics"},
    {id:2, name:"Product B", price:200, category:"Clothing"},
    {id:3, name:"Product C", price:300, category:"Electronics"},
    {id:4, name:"Product D", price:400, category:"Books"},
    {id:5, name:"Product E", price:500, category:"Clothing"},
];

// Iterate through products and create HTML for each product and fetch Unique Categories 
// and create options for the dropdown.
function productListing(inputProduct) {
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear previous products
    inputProduct = inputProduct || products; // Use provided products or default to all
    inputProduct.forEach(p => {
        productList.innerHTML += `
        <div class="product-item">
            <h3>${p.name}</h3>
        </div>`;

        categories.add(p.category);
    });
} 

function filterProducts() {
    const filteredProducts = [];
    const selectedCategory = document.getElementById("categoryDropdown").value;
    products.filter(p => {
        if (selectedCategory === "all" || p.category === selectedCategory) {
            filteredProducts.push(p);
        }     
    });
    productListing(filteredProducts);
}
// Initialize the product listing and category dropdown on page load
window.onload = function(){
    productListing(products);

    const categoryDropdown = document.getElementById("categoryDropdown");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
    // Set the default value to "all"
    categoryDropdown.value = "all";
} 