// Array of product objects with id, name, category, image path, and price
const products = [
    {
      id: 1,
      name: "Smartphone",
      category: "electronics",
      image: "assets/smartphone.png",
      price: 20000
    },
    {
      id: 2,
      name: "T-shirt",
      category: "clothing",
      image: "assets/tshirt.png",
      price: 300
    },
    {
      id: 3,
      name: "Laptop",
      category: "electronics",
      image: "assets/laptop.png",
      price: 51999
    },
    {
      id: 4,
      name: "Jeans",
      category: "clothing",
      image: "assets/jeans.png",
      price: 2300
    }
  ];
  
  /**
   * Renders products into the grid based on the selected category.
   * @param {string} category - 'all' to show every product, or a specific category
   */
  function displayProducts(category) {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";  // Clear previous content
  
    // Filter products array if a specific category is selected
    const filtered = category === "all"
      ? products
      : products.filter(p => p.category === category);
  
    // For each product in the filtered array, create and append a product card
    filtered.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      `;
      grid.appendChild(div);
    });
  }
  
  /**
   * Handler for filter buttons — simply calls displayProducts with the chosen category.
   * @param {string} cat - category to filter by
   */
  function filterProducts(cat) {
    displayProducts(cat);
  }
  
  /**
   * Adds a product to the cart (stored in localStorage), updates count,
   * and changes the “Add to Cart” button to “Go to Cart” for that product.
   * @param {number} id - ID of the product to add
   */
  function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Only add if it isn’t already in the cart
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
  
    // After adding, change the button text and onclick behavior
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      // Find product name from the same card
      const productName = btn.parentElement.querySelector("h3").textContent;
      const product = products.find(p => p.name === productName);
  
      if (product && product.id === id) {
        btn.textContent = "Go to Cart";
        btn.onclick = () => {
          window.location.href = "cart.html";
        };
      }
    });
  }
  
  /**
   * Updates the cart count badge in the header, based on localStorage.
   */
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
  }
  
  // On page load, display all products and set the cart count badge
  document.addEventListener("DOMContentLoaded", () => {
    displayProducts("all");
    updateCartCount();
  });
  