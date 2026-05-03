const productDetailContainer = document.getElementById("productDetailContainer");
const cartBadgeElem = document.getElementById("cartBadge");

// Load existing cart to maintain state and update the badge immediately
let cart = JSON.parse(localStorage.getItem("bumia_cart")) || [];
cartBadgeElem.textContent = cart.length;

// A global variable to hold the single product we fetch so we can add it to the cart
let currentProduct = null;

// --- 1. EXTRACT ID FROM URL ---
function getProductIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

// --- 2. FETCH AND RENDER SINGLE PRODUCT ---
async function fetchProductDetails() {
  const productId = getProductIdFromUrl();

  // Stress-test: What if the user navigates here without an ID in the URL?
  if (!productId) {
    productDetailContainer.innerHTML = `<h3 class="text-danger text-center mt-5">Product not found. Invalid URL.</h3>`;
    return;
  }

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    
    if (!response.ok) {
      throw new Error("Product fetch failed");
    }

    currentProduct = await response.json();
    renderProduct(currentProduct);

  } catch (error) {
    console.error(error);
    productDetailContainer.innerHTML = `<h3 class="text-danger text-center mt-5">Error loading product details.</h3>`;
  }
}

// --- 3. RENDER FUNCTION ---
function renderProduct(product) {
  productDetailContainer.innerHTML = `
    <div class="col-md-6 mb-4">
      <img src="${product.image}" alt="${product.title}" class="product-img shadow-sm">
    </div>
    <div class="col-md-6 d-flex flex-column justify-content-center">
      <span class="badge bg-secondary mb-2 align-self-start">${product.category}</span>
      <h2 class="fw-bold mb-3">${product.title}</h2>
      
      <div class="d-flex align-items-center mb-3">
        <span class="fs-4 fw-bold text-success me-3">$${Number(product.price).toFixed(2)}</span>
        <span class="text-warning">★ ${product.rating.rate} <small class="text-muted">(${product.rating.count} reviews)</small></span>
      </div>
      
      <p class="text-muted mb-4" style="line-height: 1.8;">${product.description}</p>
      
      <button onclick="addToCart()" class="btn btn-primary btn-lg w-100 fw-bold py-3 shadow-sm">Add to Cart</button>
    </div>
  `;
}

// --- 4. ADD TO CART LOGIC ---
function addToCart() {
  if (!currentProduct) return;

  // Push the current product into the cart array
  cart.push(currentProduct);

  // Save the updated array to localStorage
  localStorage.setItem("bumia_cart", JSON.stringify(cart));

  // Update the UI Badge
  cartBadgeElem.textContent = cart.length;

  alert(`Added "${currentProduct.title}" to cart!`);
}

// Start the engine
fetchProductDetails();