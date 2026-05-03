// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  const editForm = document.getElementById("editProductForm");
  const saveBtn = document.getElementById("saveChangesBtn"); // Ensure your submit button has this ID

  // 1. EXTRACT THE ID FROM THE URL (?id=123)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // If someone navigates to edit-product.html without an ID, kick them out.
  if (!productId) {
    alert("Invalid product ID. Returning to dashboard.");
    window.location.href = "my-product.html";
    return;
  }

  // 2. PRE-FILL THE FORM
  async function loadProductData() {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      
      if (!response.ok) throw new Error("Could not find product data.");
      
      const product = await response.json();

      // Populate the inputs
      document.getElementById("editProductTitle").value = product.title;
      document.getElementById("editProductPrice").value = product.price;
      document.getElementById("editProductDesc").value = product.description;
      document.getElementById("editProductCategory").value = product.category;
      document.getElementById("editProductImage").value = product.image;
      
    } catch (error) {
      console.error(error);
      alert("Failed to load product details.");
    }
  }

  loadProductData();

  // 3. HANDLE THE UPDATE
  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    // Build the payload from the current input values
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
        // Redirect back to the main inventory page
        window.location.href = "my-product.html"; 
      } else {
        throw new Error("Update failed on the server.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Something went wrong saving the product.");
      
      saveBtn.textContent = "Save Changes";
      saveBtn.disabled = false;
    }
  });
});