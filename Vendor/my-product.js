const productsContainerElem = document.getElementById("productsContainer");

// We store the fetched products here so i don't have to hit the API again just to fill the edit modal
let allProducts = []; 

// --- 1. DELETE FUNCTION ---
async function deleteProduct(productId) {
  const isConfirmed = confirm("Are you sure you want to delete this product?");
  if (!isConfirmed) return;

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, { method: "DELETE" });
    if (response.ok) {
      alert("Product deleted successfully.");
      window.location.reload(); 
    } else {
      alert("Failed to delete the product.");
    }
  } catch (error) {
    console.error("Error during deletion:", error);
  }
}
// --- 2. FETCH AND RENDER -
--
async function getAndDisplayProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) return;

    // Save the data to our local array before rendering!
    allProducts = await response.json(); 
    productsContainerElem.innerHTML = "";

    allProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "itemContainer";
      
      // Notice the Edit button: 
      // 1. It triggers my Bootstrap modal
      // 2. It triggers our openEditModal() function and passes the ID
      card.innerHTML = `
        <img src="${product.image}" class="itemImage" alt="Product Image" />
        <div class="p-3 d-flex flex-column flex-grow-1">
          <h3 class="itemTitle">${product.title}</h3>
          <p class="itemDesc">${product.description}</p>
          <h2 class="itemPrice">${Number(product.price).toFixed(2)}</h2>
          
          <div class="d-flex gap-2 mt-3">
            <button onclick="openEditModal(${product.id})" class="btn btn-sm btn-outline-primary flex-fill" data-bs-toggle="modal" data-bs-target="#editProductModal">Edit</button>
            <button onclick="deleteProduct(${product.id})" class="btn btn-sm btn-outline-danger flex-fill">Delete</button>
          </div>
        </div>
      `;
      productsContainerElem.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

// --- 3. PRE-FILL THE MODAL ---
function openEditModal(productId) {
  // Find the exact product from our local array using the ID
  const product = allProducts.find(function(currentProduct) {
  return currentProduct.id === productId;
});
  if (!product) return;

  // Push the data into the modal's input fields
  document.getElementById("editProductId").value = product.id; // The hidden input!
  document.getElementById("editProductTitle").value = product.title;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editProductDesc").value = product.description;
  document.getElementById("editProductCategory").value = product.category;
  document.getElementById("editProductImage").value = product.image;
}

// --- 4. HANDLE THE FORM SUBMISSION ---
document.getElementById("editProductForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.textContent = "Saving...";
  submitBtn.disabled = true;

  // Grab the ID from the hidden input we populated earlier
  const productId = document.getElementById("editProductId").value;

  // Package the new data
  const updatedData = {
    title: document.getElementById("editProductTitle").value.trim(),
    price: parseFloat(document.getElementById("editProductPrice").value),
    description: document.getElementById("editProductDesc").value.trim(),
    category: document.getElementById("editProductCategory").value,
    image: document.getElementById("editProductImage").value.trim(),
  };

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      alert("Product updated successfully!");
      // Close modal and refresh UI natively
      window.location.reload(); 
    } else {
      alert("Failed to update product.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred while saving.");
  } finally {
    submitBtn.textContent = "Save Changes";
    submitBtn.disabled = false;
  }
});

// Start the engine
getAndDisplayProducts();