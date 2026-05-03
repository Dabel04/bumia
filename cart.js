const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalDisplay = document.getElementById("cartTotalDisplay");

// 1. PULL THE DATA FROM THE BROWSER
// If there is nothing in localStorage, default to an empty array
let cart = JSON.parse(localStorage.getItem("bumia_cart")) || [];

// 2. RENDER THE CART AND CALCULATE TOTAL
function displayCart() {
  // Clear the UI
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  // Check if cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <li class="list-group-item text-center py-5 text-muted">
        <h4>Your cart is empty.</h4>
        <p>Go back to the shop and add some products!</p>
      </li>
    `;
    cartTotalDisplay.textContent = "$0.00";
    return;
  }

  // Loop through the cart array
  cart.forEach((product, index) => {
    // Add to the running total
    totalPrice = totalPrice + Number(product.price);

    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between align-items-center p-3";
    
    listItem.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${product.image}" class="cart-item-img border rounded p-1" alt="product">
        <div>
          <h6 class="mb-1 fw-bold">${product.title}</h6>
          <span class="badge bg-secondary">${product.category}</span>
        </div>
      </div>
      <div class="d-flex align-items-center gap-4">
        <span class="fw-bold fs-5 text-success">$${Number(product.price).toFixed(2)}</span>
        <button onclick="removeFromCart(${index})" class="btn btn-sm btn-outline-danger">X</button>
      </div>
    `;

    cartItemsContainer.appendChild(listItem);
  });

  // Update the total UI
  cartTotalDisplay.textContent = `$${totalPrice.toFixed(2)}`;
}

// Start the engine
displayCart();