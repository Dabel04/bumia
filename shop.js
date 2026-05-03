const productsContainerElem = document.getElementById("productsContainer");
const cartBadgeElem = document.getElementById("cartBadge");

// Store the fetched data just like i did on the vendor page
let allProducts = [];

//  An empty array.
let cart = []; 

// --- 1. ADD TO CART FUNCTION ---
function addToCart(productId) {
  // Find the exact product from our local array
  const product = allProducts.find(function(currentProduct) {
    return currentProduct.id === productId;
  });
  
  if (!product) return; 

  // Push the product into the cart array
  cart.push(product);

  // Save the updated array to localStorage
  localStorage.setItem("bumia_cart", JSON.stringify(cart));

  // Update the UI Badge to match the length of the array
  cartBadgeElem.textContent = cart.length;

  // Let's Give the user visual feedback so they know it worked
  alert(`Added "${product.title}" to cart!`);
}

// --- 2. FETCH AND RENDER ---
async function getAndDisplayProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    
    if (!response.ok) {
      console.error("Failed to fetch products");
      return;
    }

    // Save the data to our local array
    allProducts = await response.json(); 
    productsContainerElem.innerHTML = "";

    allProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "itemContainer"; 
      
      card.innerHTML = `
        <img src="${product.image}" class="itemImage" alt="Product Image" />
        <div class="p-3 d-flex flex-column flex-grow-1">
          <h3 class="itemTitle">${product.title}</h3>
          <p class="itemDesc">${product.description}</p>
          <h2 class="itemPrice">${Number(product.price).toFixed(2)}</h2>
          
          <div class="d-flex gap-2 mt-3">
            <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-outline-secondary flex-fill">View</a>
            <button onclick="addToCart(${product.id})" class="btn btn-sm btn-primary flex-fill">Add to Cart</button>
          </div>
        </div>
      `;
      productsContainerElem.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

// Start the engine
getAndDisplayProducts();